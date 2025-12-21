import { Router, Request, Response } from "express";
import { TaskDBA } from "../db/taskDba";
import { CreateTaskDto, Task, UpdateTaskDto } from "../models/Task";
import { isValidUtcDate, isValidUUID } from "../utils/utils";

const taskRouter = Router();
//Get all Tasks
taskRouter.get("/", async (req: Request, res: Response) => {
    try {
        const tasks: Task[] = await TaskDBA.getAllTasks();
        res.send(tasks);
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

//Create new Task
taskRouter.post("/", async (req: Request, res: Response) => {
    try {
        const taskDto = req.body as CreateTaskDto;
        if (!taskDto.title) {
            return res.status(400).send("Title is required");
        }
        if (!taskDto.description) {
            return res.status(400).send("Description is required");
        }
        if (taskDto.due_date && !isValidUtcDate(taskDto.due_date)) {
            return res.status(400).send("UTC due date is required");
        }
        if (!taskDto.status) {
            return res.status(400).send("Status is required");
        }
        if (taskDto.category_id && !isValidUUID(taskDto.category_id)) {
            return res.status(400).send("Category ID is invalid");
        }
        const newTask = { ...taskDto } as Task;
        const task: Task = await TaskDBA.createTask(newTask);
        res.send(task);
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

//Update Task by ID
taskRouter.patch("/:id", async (req: Request, res: Response) => {
    try {
        const taskDto = req.body as UpdateTaskDto;

        if (!isValidUUID(req.params.id)) {
            return res.status(400).send("ID is invalid");
        }
        if (!taskDto.title) {
            return res.status(400).send("Title is required");
        }
        if (taskDto.due_date && !isValidUtcDate(taskDto.due_date)) {
            return res.status(400).send("UTC due date is required");
        }
        if (!taskDto.description) {
            return res.status(400).send("Description is required");
        }
        if (!taskDto.status) {
            return res.status(400).send("Status is required");
        }
        if (taskDto.category_id && !isValidUUID(taskDto.category_id)) {
            return res.status(400).send("Category ID is invalid");
        }

        const taskToUpdate = { id: req.params.id, ...taskDto } as Task;
        const task: Task = await TaskDBA.updateTask(taskToUpdate);
        res.send(task);
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

//Get Task by ID
taskRouter.get("/:id", async (req: Request, res: Response) => {
    try {
        if (!isValidUUID(req.params.id)) {
            return res.status(400).send("ID is invalid");
        }
        const task: Task = await TaskDBA.getTaskById(req.params.id);
        res.send(task);
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

//Delete Task by ID.
taskRouter.delete("/:id", async (req: Request, res: Response) => {
    try {
        if (!isValidUUID(req.params.id)) {
            return res.status(400).send("ID is invalid");
        }
        const taskId: string = await TaskDBA.deleteTask(req.params.id);
        res.send(taskId);
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

export default taskRouter;