// src/controllers/auth.js

import createHttpError from "http-errors";
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

const signinController = async (req, res) => {
    const { email, password } = req.body;
    const user = await findUser({ email });
    if (!user) {
        throw createHttpError(404, "Such a contact does not exist");
    }
    const passwordCompare = await compareHash(password, user.password);
    if (!passwordCompare) {
        throw createHttpError(401, "Password is invalid");
    }

    const accsessToken = "122.4q52.444444";
    const refreshToken = "2132.4151.33";

    res.json({
        accsessToken,
        refreshToken,
    });
};

export { signupController, signinController };
