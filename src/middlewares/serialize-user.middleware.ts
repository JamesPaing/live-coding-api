import { NextFunction, Response, Request } from 'express';
import { get } from 'lodash';
import { jwtVerify } from '../utils/jwt';
import { reIssueTokens } from '../services/auth.service';

export const serializeUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const accessToken = get(req, 'headers.authorization')?.replace(
        /^Bearer\s/,
        ''
    );

    const refreshToken = String(get(req, 'x-refresh'))?.replace(
        /^Bearer\s/,
        ''
    );

    if (!accessToken) {
        return next();
    }

    const { decoded, expired } = jwtVerify(accessToken);

    if (decoded) {
        //@ts-ignore
        req.user = decoded;

        return next();
    }

    if (expired && refreshToken) {
        // re-issue new tokens
        const newTokens = (await reIssueTokens(refreshToken)) as any;

        console.log(newTokens, 'new tokens');

        const { decoded } = jwtVerify(newTokens.accessToken);

        if (decoded) {
            //@ts-ignore
            req.user = decoded;

            return next();
        }
    }

    return next();
};
