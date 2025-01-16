import { get } from 'lodash';
import { jwtSign, jwtVerify } from '../utils/jwt';
import User from '../ models/user.model';

export const signJWTs = (payload: object) => {
    const accessToken = jwtSign(payload, {
        expiresIn: process.env.ACCESS_TOKEN_TTL || '60m',
    });

    const refreshToken = jwtSign(payload, {
        expiresIn: process.env.REFRESH_TOKEN_TTL || '1y',
    });

    return {
        accessToken,
        refreshToken,
    };
};

export const reIssueTokens = async (refreshToken: string) => {
    const { decoded } = jwtVerify(refreshToken);

    console.log(decoded, 'decppded');

    if (!decoded) {
        return false;
    }

    console.log('decoded passed');

    const userId = get(decoded, '_id');

    if (!userId) {
        return false;
    }

    const user = await User.findById(userId);

    if (!user) {
        return false;
    }

    const { password, ...payload } = user.toObject();

    // generate tokens
    const newTokens = signJWTs(payload);

    return newTokens;
};
