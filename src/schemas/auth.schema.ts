import { object, string, TypeOf } from 'zod';

export const registerSchema = object({
    body: object({
        username: string({
            required_error: 'Username is required',
        }),
        email: string({
            required_error: 'Email is required',
        }).email('Invalid email'),
        password: string({
            required_error: 'Password is required',
        }).min(6, 'Password must be at least 6 characters.'),
        passwordConfirmation: string({
            required_error: 'Password Confirmation is required',
        }).min(6, 'Password Confirmation must be at least 6 characters.'),
    }).refine((data) => data.password === data.passwordConfirmation, {
        message: 'Passwords do not match',
        path: ['passwordConfirmation'],
    }),
});

export const loginSchema = object({
    body: object({
        email: string({
            required_error: 'Email is required',
        }).email('Invalid email'),
        password: string({
            required_error: 'Password is required.',
        }),
    }),
});

export type RegisterInput = TypeOf<typeof registerSchema>;
export type LoginInput = TypeOf<typeof loginSchema>;
