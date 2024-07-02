// src/services/auth.js

import { User } from "../db/models/user.js";
import { hashValue } from "../utils/hash.js";

const findUser = filter => User.findOne(filter);

const signup = async (data) => {
    const { password } = data;
    const hashPasword = await hashValue(password);
    return User.create({ ...data, password: hashPasword });
};


export { findUser, signup };
