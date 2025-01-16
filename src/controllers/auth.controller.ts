import { NextFunction, Response, Request } from 'express';
import { catchAsync } from '../utils/catchAsync';
import User, { UserDocument } from '../ models/user.model';
import { signJWTs } from '../services/auth.service';
import AppError from '../helpers/app-error';

export const registerHandler = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const user = await User.create(req.body);

        const { password, ...payload } = user.toObject();

        // generate tokens
        const { accessToken, refreshToken } = signJWTs(payload);

        res.status(201).json({
            accessToken,
            refreshToken,
            user: payload,
        });
    }
);

export const loginHandler = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const user = (await User.findOne({
            email: req.body.email,
        })) as UserDocument;

        if (!user) {
            throw new AppError('User not found', 400);
        }

        //@ts-ignore
        if (!(await user.comparePassword(req.body.password))) {
            throw new AppError('Invalid credentials', 400);
        }

        const { password, ...payload } = user.toObject();

        // generate tokens
        const { accessToken, refreshToken } = signJWTs(payload);

        res.status(201).json({
            accessToken,
            refreshToken,
            user: payload,
        });
    }
);
