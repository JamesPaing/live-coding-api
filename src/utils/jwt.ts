import jwt from 'jsonwebtoken';

export const jwtSign = (paylaod: object, options: jwt.SignOptions) => {
    return jwt.sign(paylaod, process.env.JWT_SECRET!, options);
};

export const jwtVerify = (token: string) => {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!);

        return {
            valid: true,
            expired: false,
            decoded,
        };
    } catch (error: any) {
        return {
            valid: false,
            expired: error.message === 'jwt expired',
            decoded: null,
        };
    }
};
