// src/services/session.js

import { randomBytes } from "node:crypto";
import Session from "../db/models/session.js";
import { FIFTEEN_NINUTES, THIRTY_DAYS } from "../constants/index.js";

const findSession = filter => Session.findOne(filter);

const createSession = async (userId) => {
    await Session.deleteOne({ userId });

    const accessToken = randomBytes(30).toString("base64");
    const refreschToken = randomBytes(30).toString("base64");

    const accessTokenValidUntil = new Date(Date.now() + FIFTEEN_NINUTES);
    const refreschTokenValidUntil = new Date(Date.now() + THIRTY_DAYS);

    return Session.create({
        userId,
        accessToken,
        refreschToken,
        accessTokenValidUntil,
        refreschTokenValidUntil,
    });
};

const deleteSession = filter => Session.deleteOne(filter);

export { findSession, createSession, deleteSession };
