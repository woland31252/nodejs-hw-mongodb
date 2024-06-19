// src/middlewares/notFoundHandler.js

const notFoundHandler = (req, res, next) => {

    res.status(404).json({
        status: 404,
        message: 'Route not found'
    });
};

export default notFoundHandler;
