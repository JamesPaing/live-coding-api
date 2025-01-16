import mongoose, { model } from 'mongoose';
import bcrypt from 'bcrypt';

export interface UserDocument extends mongoose.Document {
    username: string;
    email: string;
    password: string;
    comparePassword?(candidatePassword: string): Promise<boolean>;
}

const userSchema = new mongoose.Schema(
    {
        username: String,
        email: String,
        password: String,
    },
    {
        timestamps: true,
    }
);

userSchema.index({
    email: 1,
});

userSchema.pre('save', async function (next) {
    const user = this as UserDocument;

    if (!user.isModified('password')) {
        return next();
    }

    // hash the password
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(user.password, salt);

    user.password = hash;

    next();
});

userSchema.methods.comparePassword = async function (
    candidatePassword: string
) {
    const user = this as UserDocument;

    return bcrypt.compare(candidatePassword, user.password).catch((e) => false);
};

const User = mongoose.model('User', userSchema);

export default User;
