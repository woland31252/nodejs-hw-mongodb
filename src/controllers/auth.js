// src/controllers/auth.js

import createHttpError from "http-errors";
import { logup, findUser, requestResetToken, resetPassword, loginOrSignupWithGoogle } from "../services/auth.js";
import { compareHash } from "../utils/hash.js";
import {
  createSession,
  findSession,
  deleteSession,
} from '../services/session.js';
import { generateAuthUrl } from "../utils/googleOAuth.js";

const setupResponseSession = (
  res,
  { refreshToken, refreshTokenValidUntil, _id },
) => {
  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    expires: refreshTokenValidUntil,
  });

  res.cookie('sessionId', _id, {
    httpOnly: true,
    expires: refreshTokenValidUntil,
  });
};

const logupController = async (req, res) => {
    const { email } = req.body;
    const user = await findUser({ email });
    if (user) {
        throw createHttpError(409, "Email in use");
    }
    const newUser = await logup(req.body);
    const data = {
        name: newUser.name,
        email: newUser.email,
    };
    res.status(201).json({
        status: 201,
        data,
        message: 'Successfully registered a user!',
    });
};


const loginController = async (req, res) => {
    const { email, password } = req.body;
    const user = await findUser({ email });
    if (!user) {
        throw createHttpError(404, "Such a contact does not exist");
    }
    const passwordCompare = await compareHash(password, user.password);
    if (!passwordCompare) {
        throw createHttpError(401, "Password is invalid");
    }

    const session = await createSession(user._id);
  setupResponseSession(res, session);

    res.json({
      status: 200,
      message: 'Successfully logged in an user!',
      data: {
        accessToken: session.accessToken,
      },
    });
};

const refreshController = async (req, res) => {
    const { refreshToken, sessionId } = req.cookies;
    const currentSession = await findSession({ _id: sessionId, refreshToken });
    if (!currentSession) {
        throw createHttpError(401, "Session not found");
    }

    const refreshTokenExpired = new Date() > new Date(currentSession.refreshTokenValidUntil);
    if (refreshTokenExpired) {
        throw createHttpError(401, "Session is expired");
    }

    const newSession = await createSession(currentSession.userId);
    setupResponseSession(res, newSession);

    res.json({
        status: 200,
        message: 'Successfully refreshed a session!',
        data: {
            accessToken: newSession.accessToken,
        }
    });
};

const logoutController = async (req, res) => {
    const { sessionId } = req.cookies;
    if (!sessionId) {
        throw createHttpError(401, "Session is not found");
    }
    await deleteSession({ _id: sessionId });

    res.clearCookie("sessionId");
    res.clearCookie("refreshToken");

    res.status(204).send();
};

const requestResetEmailController = async (req, res) => {
  await requestResetToken(req.body.email);
  res.json({
    message: "Reset password email has been successfully sent.",
    status: 200,
    data: {},
  });
};

const resetPasswordController = async (req, res) => {
  await resetPassword(req.body);
  res.json({
    message: "Password has been successfully reset",
    status: 200,
    data: {},
  });
};

const getGoogleOAuthUrlController = async (req, res) => {
  const url = generateAuthUrl();
  res.json({
    status: 200,
    message: 'Successfully get Google OAuth url!',
    data: {
      url,
    }
  });
};

const loginWithGoogleController = async (req, res) => {
  const session = await loginOrSignupWithGoogle(req.body.code);
  setupResponseSession(res, session);

  res.json({
    status: 200,
    message: "Successfully logged in via Google OAuth",
    data: {
      accessToken: session.accessToken,
    },
  });
};

export {
  logupController,
  loginController,
  refreshController,
  logoutController,
  requestResetEmailController,
  resetPasswordController,
  getGoogleOAuthUrlController,
  loginWithGoogleController,
};
