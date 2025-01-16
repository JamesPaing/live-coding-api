import { NextFunction, Response, Request } from 'express';
import AppError from '../helpers/app-error';

export const requireUser = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    //@ts-ignore
    const user = req.user;

    if (!user) {
        next(new AppError('You do not have acceess to this resource', 403));
    }

    next();
};
