// src/routers/auth.js

import { Router } from "express";
import ctrlWrapper from '../utils/ctrlWrapper.js';
import validateBody from '../utils/validateBody.js';
import { userSignupSchema } from "../validation/userSchemas.js";
import { signupController } from "../controllers/auth.js";

const router = Router();

router.post('/auth/register', validateBody(userSignupSchema), ctrlWrapper(signupController));

export default router;
