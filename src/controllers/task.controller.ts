import { NextFunction, Response, Request } from 'express';
import { catchAsync } from '../utils/catchAsync';
import Task from '../ models/task.model';

export const getAllTasksHandler = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const search = req.query.search as string;
        delete req.query.search;

        let query = Task.find(req.query);

        if (search) {
            query = Task.find({
                title: {
                    $regex: new RegExp(decodeURI(search), 'i'),
                },
            });
        }

        const tasks = await query;

        res.status(200).json({
            status: 'success',
            total_docs: tasks.length,
            data: tasks,
        });
    }
);
