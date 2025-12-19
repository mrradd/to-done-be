import { Router, Request, Response } from "express";

const categoryRouter = Router();

categoryRouter.get('/', (req: Request, res: Response) => {
    try {
        res.send('GET THE CATEGORIES');
    }
    catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

categoryRouter.post('/', (req: Request, res: Response) => {
    try {
        res.send('CREATE A NEW CATEGORY');
    }
    catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

categoryRouter.post('/:id', (req: Request, res: Response) => {
    try {
        res.send(`UPDATE CATEGORY ${req.params.id}`);
    }
    catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

categoryRouter.get('/:id', (req: Request, res: Response) => {
    try {
        res.send(`GET CATEGORY ${req.params.id}`);
    }
    catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

categoryRouter.put('/:id', (req: Request, res: Response) => {
    try {
        res.send(`UPDATE CATEGORY ${req.params.id}`);
    }
    catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

categoryRouter.delete('/:id', (req: Request, res: Response) => {
    try {
        res.send(`DELETE CATEGORY ${req.params.id}`);
    }
    catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

export default categoryRouter;