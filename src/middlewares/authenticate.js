import createHttpError from "http-errors";
import { findUser } from "../services/auth.js";
import { findSession } from "../services/session.js";

const authenticate = async (req, res, next) => {
    const authHeader = req.get('Authorization');
    if (!authHeader) {
        return next(createHttpError(401, "Authorization header missing"));
    }

    const [bearer, accessToken] = authHeader.split(' ');

    if (bearer !== 'Bearer' || !accessToken) {
        return next(createHttpError(401, "Auth header should be of type Bearer"));
    }

    const session = await findSession({ accessToken });
    if (!session) {
        return next(createHttpError(401, "Session not found"));
    }

    const accessTokenExpired = new Date() > new Date(session.accessTokenValidUntil);
    if (accessTokenExpired) {
        return next(createHttpError(401, "Access token expired"));
    }

    const user = await findUser({ _id: session.userId });
    if (!user) {
        return next(createHttpError(401, "User not found"));
    }

    req.user = user;
    next();
};

export default authenticate;
