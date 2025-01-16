import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema(
    {
        title: String,
        description: String,
        status: {
            type: String,
            enum: ['pending', 'onprogress', 'completed'],
        },
        priority: {
            type: String,
            enum: ['low', 'medium', 'high'],
        },
        dueDate: Date,
    },
    {
        timestamps: true,
    }
);

const Task = mongoose.model('Task', taskSchema);

export default Task;
