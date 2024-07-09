// src/services/auth.js
import jwt from 'jsonwebtoken';
import handlebars from 'handlebars';
import path from 'path';
import fs from 'node:fs/promises';
import createHttpError from "http-errors";
import { env } from '../utils/env.js';
import { SMTP, TEMPLATES_DIR } from '../constants/index.js';
import { User } from "../db/models/user.js";
import { hashValue } from "../utils/hash.js";
import { sendEmail } from '../utils/sendMail.js';

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

    await sendEmail({
        from: env(SMTP.SMTP_FROM),
        to: email,
        subject: "Reset your password",
        html,
    });
};


export { findUser, logup, requestResetToken };

