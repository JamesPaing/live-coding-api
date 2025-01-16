import { NextFunction, Response, Request } from 'express';
import { catchAsync } from '../utils/catchAsync';
import { faker } from '@faker-js/faker';
import Task from '../ models/task.model';
import path from 'path';
import fs from 'fs';

const status = ['pending', 'onprogress', 'completed'];
const priorities = ['low', 'medium', 'high'];

export const migrateHandler = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const tasks = [];
        const numDocs = 30;

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

export const exportHandler = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const tasks = await Task.find();

        res.setHeader('Content-Type', 'application/json');

        // Send the documents as a JSON response
        res.status(200).json(tasks);
    }
);

export const exportDownloadHandler = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const tasks = await Task.find();

        const filePath = path.join(__dirname, 'exported_data.json');

        fs.writeFileSync(filePath, JSON.stringify(tasks));

        res.download(filePath, 'exported_data.json', (err) => {
            if (err) {
                console.error('Error sending file:', err);
                res.status(500).send({ error: 'Failed to send the file.' });
            } else {
                fs.unlinkSync(filePath);
            }
        });
    }
);
