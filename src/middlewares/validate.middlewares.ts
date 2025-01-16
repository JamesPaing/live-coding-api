import { NextFunction, Response, Request, query } from 'express';
import { AnyZodObject } from 'zod';

export const validate =
    (schema: AnyZodObject) =>
    (req: Request, res: Response, next: NextFunction) => {
        try {
            schema.parse({
                body: req.body,
                query: req.query,
                params: req.params,
            });

            next();
        } catch (error: any) {
            console.log(error);

            res.status(400).json({
                status: 'error',
                error: error.errors,
            });
        }
    };
