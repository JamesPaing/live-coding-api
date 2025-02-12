import mongoose from 'mongoose';

export const connect = async () => {
    try {
        await mongoose.connect(process.env.DB_URI!);

        console.log('Connected to DB!');
    } catch (error) {
        console.log('Error connecting to DB!');
        process.exit(1);
    }
};
