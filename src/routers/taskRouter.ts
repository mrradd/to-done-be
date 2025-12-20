import { Router, Request, Response } from "express";
import { TaskDBA } from "../db/taskDba";
import { Task } from "../models/Task";
import { isValidUtcDate, isValidUUID } from "../utils/utils";

const taskRouter = Router();
//Get all Tasks
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

//Create new Task
taskRouter.post('/', async (req: Request, res: Response) => {
    try {
        const taskToCreate = req.body as Task;
        if (!taskToCreate.title) {
            return res.status(400).send('Title is required');
        }
        if (!taskToCreate.description) {
            return res.status(400).send('Description is required');
        }
        if (taskToCreate.due_date && !isValidUtcDate(taskToCreate.due_date)) {
            return res.status(400).send('UTC due date is required');
        }
        if (!taskToCreate.status) {
            return res.status(400).send('Status is required');
        }
        if (taskToCreate.category_id && !isValidUUID(taskToCreate.category_id)) {
            return res.status(400).send('Category ID is invalid');
        }

        const task: Task = await TaskDBA.createTask(taskToCreate);
        res.send(task);
    }
    catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

//Update Task by ID
taskRouter.put('/:id', async (req: Request, res: Response) => {
    try {
        const taskToUpdate = req.body as Task;
        taskToUpdate.id = req.params.id;

        if (!isValidUUID(taskToUpdate.id)) {
            return res.status(400).send('ID is invalid');
        }
        if (!taskToUpdate.title) {
            return res.status(400).send('Title is required');
        }
        if (taskToUpdate.due_date && !isValidUtcDate(taskToUpdate.due_date)) {
            return res.status(400).send('UTC due date is required');
        }
        if (!taskToUpdate.description) {
            return res.status(400).send('Description is required');
        }
        if (!taskToUpdate.status) {
            return res.status(400).send('Status is required');
        }
        if (taskToUpdate.category_id && !isValidUUID(taskToUpdate.category_id)) {
            return res.status(400).send('Category ID is invalid');
        }

        const task: Task = await TaskDBA.updateTask(taskToUpdate);
        res.send(task);
    }
    catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

//Get Task by ID
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

//Delete Task by ID.
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