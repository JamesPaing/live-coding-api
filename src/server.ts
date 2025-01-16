import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { loginHandler, registerHandler } from './controllers/auth.controller';
import { getAllTasksHandler } from './controllers/task.controller';
import { migrateHandler } from './controllers/migration.controller';
import { connect } from './utils/connect';
import { errorHandler } from './helpers/error-handler';
import { serializeUser } from './middlewares/serialize-user.middleware';
import { requireUser } from './middlewares/require-user.middleware';
import { validate } from './middlewares/validate.middlewares';
import { loginSchema, registerSchema } from './schemas/auth.schema';

dotenv.config();
const app = express();

// middlewares
app.use(cors());
app.use(express.json());
app.use(serializeUser);

app.post('/auth/register', validate(registerSchema), registerHandler);
app.post('/auth/login', validate(loginSchema), loginHandler);
app.get('/api/tasks', requireUser, getAllTasksHandler);
app.get('/migrate', migrateHandler);

app.use(errorHandler);

const port = process.env.PORT || 8000;

app.listen(port, async () => {
    console.log('Server started at port ' + port);

    await connect();
});
