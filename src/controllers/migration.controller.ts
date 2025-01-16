import { NextFunction, Response, Request } from 'express';
import { catchAsync } from '../utils/catchAsync';
import { faker } from '@faker-js/faker';
import Task from '../ models/task.model';

const status = ['pending', 'onprogress', 'completed'];
const priorities = ['low', 'medium', 'high'];

export const migrateHandler = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const tasks = [];
        const numDocs = 10;

        for (let i = 0; i < numDocs; i++) {
            tasks.push({
                title: faker.lorem.word(),
                description: faker.lorem.sentence(),
                status: status[
                    faker.number.int({
                        min: 0,
                        max: status.length - 1,
                    })
                ],
                priority:
                    priorities[
                        faker.number.int({
                            min: 0,
                            max: priorities.length - 1,
                        })
                    ],
                dueDate: faker.date.future(),
            });
        }

        await Task.insertMany(tasks);

        res.status(201).send('DB migration success!');
    }
);
