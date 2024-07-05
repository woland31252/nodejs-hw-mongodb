// src/routers/auth.js

import { Router } from "express";
import ctrlWrapper from '../utils/ctrlWrapper.js';
import validateBody from '../utils/validateBody.js';
import { userLogupSchema, userLoginSchema } from "../validation/userSchemas.js";
import { logupController, loginController, refreshController, logoutController } from "../controllers/auth.js";

const router = Router();

router.post('/register', validateBody(userLogupSchema), ctrlWrapper(logupController));

router.post('/login', validateBody(userLoginSchema), ctrlWrapper(loginController));

router.post('/refresh', ctrlWrapper(refreshController));

router.post('/logout', ctrlWrapper(logoutController));


export default router;
