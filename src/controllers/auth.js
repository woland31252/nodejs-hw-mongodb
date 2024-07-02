// src/controllers/auth.js

import createHttpError from "http-errors.js";
import { signup, findUser } from "../services/auth.js";
import { compareHash } from "../utils/hash.js";

const signupController = async (req, res) => {
    const { email } = req.body;
    const user = await findUser({ email });
    if (user) {
        throw createHttpError(409, "Email in use");
    }
    const newUser = await signup(req.body);
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

export { signupController };
