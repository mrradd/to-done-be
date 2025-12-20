import { Router, Request, Response } from "express";
import { CategoryDBA } from "../db/categoryDba";
import { isValidUUID } from "../utils/utils";
import { Category } from "../models/Category";

const categoryRouter = Router();

categoryRouter.get('/', async (req: Request, res: Response) => {
    try {
        const categories: Category[] = await CategoryDBA.getAllCategories();
        res.send(categories);
    }
    catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

categoryRouter.post('/', async (req: Request, res: Response) => {
    try {
        if (!req.body.name) {
            return res.status(400).send('Name is required');
        }
        if (!req.body.id) {
            return res.status(400).send('ID is required');
        }
        if (!isValidUUID(req.body.id)) {
            return res.status(400).send('ID is invalid');
        }

        const category: Category = await CategoryDBA.createCategory(req.body);
        res.send(category);
    }
    catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

categoryRouter.get('/:id', async (req: Request, res: Response) => {
    try {
        if (!isValidUUID(req.params.id)) {
            return res.status(400).send('ID is invalid');
        }
        const category: Category = await CategoryDBA.getCategoryById(req.params.id);
        res.send(category);
    }
    catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

categoryRouter.put('/:id', async (req: Request, res: Response) => {
    try {
        if (!isValidUUID(req.params.id)) {
            return res.status(400).send('ID is invalid');
        }
        const category: Category = await CategoryDBA.updateCategory(req.body);
        res.send(category);
    }
    catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

categoryRouter.delete('/:id', async (req: Request, res: Response) => {
    try {
        if (!isValidUUID(req.params.id)) {
            return res.status(400).send('ID is invalid');
        }
        const category: string = await CategoryDBA.deleteCategory(req.params.id);
        res.send(category);
    }
    catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

export default categoryRouter;