import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import taskRouter from './routers/taskRouter';
import categoryRouter from './routers/categoryRouter';
import cors from "cors";

dotenv.config();
const app = express();
const port: number = process.env.PORT ? parseInt(process.env.PORT) : 3000;
const host: string = process.env.HOST ?? 'localhost';

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!');
});

app.use('/tasks', taskRouter);
app.use('/categories', categoryRouter);

app.listen(port, host, () => {
    console.log(`Server running on http://${host}:${port}`);
});