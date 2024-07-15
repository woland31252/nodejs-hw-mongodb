// src/services/auth.js
import jwt from 'jsonwebtoken';
import handlebars from 'handlebars';
import path from 'path';
import bcrypt from 'bcrypt';
import fs from 'node:fs/promises';
import createHttpError from "http-errors";
import { env } from '../utils/env.js';
import { SMTP, TEMPLATES_DIR } from '../constants/index.js';
import { User } from "../db/models/user.js";
import { hashValue } from "../utils/hash.js";
import { sendEmail } from '../utils/sendMail.js';
import { getFullNameFromGoogleTokenPayload, validateCode } from '../utils/googleOAuth.js';
import { randomBytes } from 'crypto';
import { createSession } from './session.js';
import Session from '../db/models/session.js';

const findUser = filter => User.findOne(filter);

const logup = async (data) => {
    const { password } = data;
    const hashPasword = await hashValue(password);
    return User.create({ ...data, password: hashPasword });
};

const requestResetToken = async (email) => {
    const user = await User.findOne({ email });
    if (!user) {
        throw createHttpError(404, "User not found");
    }
    const resetToken = jwt.sign(
        {
            sub: user._id,
            email,
        },

        env('JWT_SECRET'),

        {
            expiresIn: '5m',
        },
    );
    console.log("token: ", resetToken);

    const resetPassTempPath = path.join(
        TEMPLATES_DIR,
        'reset-password-email.html',
    );

    const tempSource = (await fs.readFile(resetPassTempPath)).toString();

    const template = handlebars.compile(tempSource);

    const html = template({
      name: user.name,
      link: `${env('APP_DOMAIN')}/reset-password?token=${resetToken}`,
    });

    try {
        await sendEmail({
        from: env(SMTP.SMTP_FROM),
        to: email,
        subject: "Reset your password",
        html,
    });
    } catch {
        throw createHttpError(
          500, 'Failed to send the email, please try again later.',
        );
}

};

const resetPassword = async (payload) => {
    let entries;
    try {
        entries = jwt.verify(payload.token, env('JWT_SECRET'));
    } catch (error) {
        if (error instanceof Error)
            throw createHttpError(401, 'Token is expired or invalid.');
        throw error;
    }
    const user = await User.findOne({
        email: entries.email,
        _id: entries.sub,
    });

    if (!user) {
        throw createHttpError(404, 'User not found');
    }

    const encryptedPassword = await hashValue(payload.password);
    await User.updateOne(
        { _id: user._id },
        { password: encryptedPassword },
    );
};

const loginOrSignupWithGoogle = async (code) => {
    const loginTicket = await validateCode(code);
    const payload = loginTicket.getPayload();
    if (!payload) {
        throw createHttpError(401, "Ha Ha Ha");
    }

    let user = await User.findOne({
        email: payload.email,
    });
    if (!user) {
        const password = await bcrypt.hash(randomBytes(10), 10);
        user = await User.create({
            email: payload.email,
            name: getFullNameFromGoogleTokenPayload(payload),
            password,
        });
    }
    const newSession = createSession();
    return await Session.create({
        userId: user._id,
        ...newSession,
    });
};


export {
  findUser,
  logup,
  requestResetToken,
  resetPassword,
  loginOrSignupWithGoogle,
};

