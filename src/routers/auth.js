// src/routers/auth.js

import { Router } from "express";
import ctrlWrapper from '../utils/ctrlWrapper.js';
import validateBody from '../utils/validateBody.js';
import { userSignupSchema, userSigninSchema } from "../validation/userSchemas.js";
import { signupController, signinController } from "../controllers/auth.js";

const router = Router();

router.post('/register', validateBody(userSignupSchema), ctrlWrapper(signupController));

router.post('/login', validateBody(userSigninSchema), ctrlWrapper(signinController));


export default router;
