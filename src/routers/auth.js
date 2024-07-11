// src/routers/auth.js

import { Router } from "express";
import ctrlWrapper from '../utils/ctrlWrapper.js';
import validateBody from '../utils/validateBody.js';
import {
    userLogupSchema,
    userLoginSchema,
    requestResetEmailSchema,
    resetPasswordSchema, } from "../validation/userSchemas.js";
import {
    logupController,
    loginController,
    refreshController,
    logoutController,
    requestResetEmailController,
    resetPasswordController, } from "../controllers/auth.js";

const router = Router();

router.post('/register', validateBody(userLogupSchema), ctrlWrapper(logupController));

router.post('/login', validateBody(userLoginSchema), ctrlWrapper(loginController));

router.post('/refresh', ctrlWrapper(refreshController));

router.post('/logout', ctrlWrapper(logoutController));

router.post('/send-reset-email', validateBody(requestResetEmailSchema), ctrlWrapper(requestResetEmailController));

router.post('/reset-pwd', validateBody(resetPasswordSchema), ctrlWrapper(resetPasswordController));


export default router;
