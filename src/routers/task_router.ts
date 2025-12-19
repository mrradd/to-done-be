import { Router, Request, Response } from "express";

const taskRouter = Router();
taskRouter.get('/', (req: Request, res: Response) => {
    try {
        res.send('GET THE TASKS');
    }
    catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

taskRouter.post('/', (req: Request, res: Response) => {
    try {
        res.send('CREATE A NEW TASK');
    }
    catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

taskRouter.put('/:id', (req: Request, res: Response) => {
    try {
        res.send(`UPDATE AN EXISTING TASK ${req.params.id}`);
    }
    catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

taskRouter.get('/:id', (req: Request, res: Response) => {
    try {
        res.send(`GET AN EXISTING TASK ${req.params.id}`);
    }
    catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

taskRouter.delete('/:id', (req: Request, res: Response) => {
    try {
        res.send(`DELETE AN EXISTING TASK ${req.params.id}`);
    }
    catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});
export default taskRouter;