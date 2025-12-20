import { Router, Request, Response } from "express";
import { TaskDBA } from "../db/taskDba";
import { Task } from "../models/Task";
import { isValidUUID } from "../utils/utils";

const taskRouter = Router();
taskRouter.get('/', async (req: Request, res: Response) => {
    try {
        const tasks: Task[] = await TaskDBA.getAllTasks();
        res.send(tasks);
    }
    catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

taskRouter.post('/', async (req: Request, res: Response) => {
    try {
        if (!req.body.title) {
            return res.status(400).send('Title is required');
        }
        if (!req.body.description) {
            return res.status(400).send('Description is required');
        }
        if (!req.body.due_date) {
            return res.status(400).send('Due date is required');
        }
        if (!req.body.created_date) {
            return res.status(400).send('Created date is required');
        }
        if (!req.body.status) {
            return res.status(400).send('Status is required');
        }
        if (req.body.category_id && !isValidUUID(req.body.category_id)) {
            return res.status(400).send('Category ID is invalid');
        }

        const task: Task = await TaskDBA.createTask(req.body);
        res.send(task);
    }
    catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

taskRouter.put('/:id', async (req: Request, res: Response) => {
    try {
        if (!isValidUUID(req.params.id)) {
            return res.status(400).send('ID is invalid');
        }
        if (!req.body.title) {
            return res.status(400).send('Title is required');
        }
        if (!req.body.description) {
            return res.status(400).send('Description is required');
        }
        if (!req.body.status) {
            return res.status(400).send('Status is required');
        }
        if (req.body.category_id && !isValidUUID(req.body.category_id)) {
            return res.status(400).send('Category ID is invalid');
        }

        const task: Task = await TaskDBA.updateTask(req.body);
        res.send(task);
    }
    catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

taskRouter.get('/:id', async (req: Request, res: Response) => {
    try {
        if (!isValidUUID(req.params.id)) {
            return res.status(400).send('ID is invalid');
        }
        const task: Task = await TaskDBA.getTaskById(req.params.id);
        res.send(task);
    }
    catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

taskRouter.put('/', async (req: Request, res: Response) => {
    try {
        if (!isValidUUID(req.body.id)) {
            return res.status(400).send('ID is invalid');
        }
        if (!isValidUUID(req.body.category_id)) {
            return res.status(400).send('Category ID is invalid');
        }
        const task: Task = await TaskDBA.updateTask(req.body);
        res.send(task);
    }
    catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

taskRouter.delete('/:id', async (req: Request, res: Response) => {
    try {
        if (!isValidUUID(req.params.id)) {
            return res.status(400).send('ID is invalid');
        }
        const taskId: string = await TaskDBA.deleteTask(req.params.id);
        res.send(taskId);
    }
    catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});
export default taskRouter;