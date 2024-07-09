// src/services/auth.js

import createHttpError from "http-errors";
import { User } from "../db/models/user.js";
import { hashValue } from "../utils/hash.js";

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
};


export { findUser, logup, requestResetToken };

