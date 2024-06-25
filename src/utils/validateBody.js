import createHttpError from "http-errors";

const validateBody = (schema) => {
    const func = async (req, res, next) => {
        try {
            await schema.validateAsync(req.body, { abortEarly: false, });
        } catch (error) {
            const responseErr = createHttpError(400, error.message, { errors: error.details, });
            next(responseErr);
        }
    };
    return func;
};

export default validateBody;
