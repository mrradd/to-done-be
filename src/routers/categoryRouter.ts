import { Router, Request, Response } from "express";
import { CategoryDBA } from "../db/categoryDba";
import { isValidUUID } from "../utils/utils";
import { Category, CreateCategoryDto as CategoryDto } from "../models/Category";

const categoryRouter = Router();

//Get all Categories
categoryRouter.get("/", async (req: Request, res: Response) => {
    try {
        const categories: Category[] = await CategoryDBA.getAllCategories();
        res.send(categories);
    }
    catch (error) {
        console.error(error)
        res.status(500).send("Internal Server Error");
    }
});

//Create new Category
categoryRouter.post("/", async (req: Request, res: Response) => {
    try {
        const categoryDto = req.body as CategoryDto;
        if (!categoryDto.name) {
            return res.status(400).send("Name is required");
        }

        const newCategory = { ...categoryDto } as Category;
        const category: Category = await CategoryDBA.createCategory(newCategory);
        res.send(category);
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

//Get Category by ID
categoryRouter.get("/:id", async (req: Request, res: Response) => {
    try {
        if (!isValidUUID(req.params.id)) {
            return res.status(400).send("ID is invalid");
        }
        const category: Category = await CategoryDBA.getCategoryById(req.params.id);
        res.send(category);
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

//Update Category by ID
categoryRouter.patch("/:id", async (req: Request, res: Response) => {
    try {
        const updatedCategory = req.body as Category;
        updatedCategory.id = req.params.id;
        if (!isValidUUID(updatedCategory.id)) {
            return res.status(400).send("ID is invalid");
        }
        const category: Category = await CategoryDBA.updateCategory(updatedCategory);
        res.send(category);
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

//Delete Category by ID
categoryRouter.delete("/:id", async (req: Request, res: Response) => {
    try {
        if (!isValidUUID(req.params.id)) {
            return res.status(400).send("ID is invalid");
        }
        const category: string = await CategoryDBA.deleteCategory(req.params.id);
        res.send(category);
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

export default categoryRouter;