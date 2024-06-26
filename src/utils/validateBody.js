import createHttpError from 'http-errors';

const validateBody = (schema) => async (req, res, next) => {
  try {
    await schema.validateAsync(req.body, { abortEarly: false });
    next();
  } catch (err) {
    const error = createHttpError(404, 'Bad request', { errors: err.details });
    next(error);
  }
};

export default validateBody;
