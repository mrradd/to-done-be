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
        res.send(`UPDATE TASK ${req.params.id}`);
    }
    catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

taskRouter.get('/:id', (req: Request, res: Response) => {
    try {
        res.send(`GET TASK ${req.params.id}`);
    }
    catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

taskRouter.put('/:id/category/:category_id', (req: Request, res: Response) => {
    try {
        res.send(`UPDATE TASK ${req.params.id} WITH CATEGORY ${req.params.category_id}`);
    }
    catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

taskRouter.delete('/:id', (req: Request, res: Response) => {
    try {
        res.send(`DELETE TASK ${req.params.id}`);
    }
    catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});
export default taskRouter;