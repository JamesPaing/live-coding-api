import { NextFunction, Request, Response } from 'express';

export const catchAsync = (asynFnc: any) => {
    return (req: Request, res: Response, next: NextFunction) => {
        asynFnc(req, res, next).catch((e: any) => {
            console.log(e);
            next(e);
        });
    };
};
