import { NextFunction, Response, Request } from 'express';
import AppError from './app-error';

export const errorHandler = (
    err: AppError,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Something went wrong';

    res.status(statusCode).json({
        status: 'error',
        statusCode,
        message,
    });
};
