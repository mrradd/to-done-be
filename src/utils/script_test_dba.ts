
import { TaskDBA } from "../db/taskDba";
import { Task } from "../models/Task";
import crypto from "crypto";
import { TheDB } from "../db/theDb";
import { Category } from "../models/Category";
import { CategoryDBA } from "../db/categoryDba";
import dotenv from "dotenv";
dotenv.config();

//Test the TaskDBA class.
const runTaskTest = async () => {
    console.log("Starting TaskDBA Transaction Test...");

    const taskId = crypto.randomUUID();

    const dueDate = new Date();
    dueDate.setFullYear(2027);
    const newTask: Task = {
        id: taskId,
        title: "Test Task",
        description: "Description of test task",
        due_date: dueDate.toUTCString(),
        created_date: new Date().toUTCString(), //Including this since it is required by the model, but it is set inside the createTask method.
        status: 0,
        category_id: ""
    };

    let createdTask: Task | null = null;
    try {
        console.log("Creating task...");
        createdTask = await TaskDBA.createTask(newTask);
        console.log("Task created successfully:", createdTask);
    } catch (error) {
        console.error("Failed to create task:", error);
    }

    // Update
    createdTask!.status = 1;
    let updatedTask: Task | null = null;
    try {
        console.log("Updating task...");
        updatedTask = await TaskDBA.updateTask(createdTask!);
        console.log("Task updated successfully.");
    } catch (error) {
        console.error("Failed to update task:", error);
    }

    // Verify update using TaskDBA methods
    try {
        console.log("Fetching task by ID...");
        const task = await TaskDBA.getTaskById(updatedTask!.id);
        if (!task) {
            console.error("Task not found in DB!");
        } else {
            console.log("Task found in DB:", task);
            if (task.status === 1) {
                console.log("SUCCESS: Task status is Complete.");
            } else {
                console.error("FAILURE: Task status is not Complete, it is " + task.status);
            }
        }

        console.log("Fetching all tasks...");
        const allTasks = await TaskDBA.getAllTasks();
        console.log(`Found ${allTasks.length} tasks.`);
        const found = allTasks.find((t: any) => t.id === updatedTask!.id);
        if (found) {
            console.log("SUCCESS: Created task found in getAllTasks list.");
        } else {
            console.error("FAILURE: Created task NOT found in getAllTasks list.");
        }

    } catch (err) {
        console.error("Error verifying task:", err);
    }
};

//Test the CategoryDBA class.
const runCategoryTest = async () => {
    console.log("Starting CategoryDBA Transaction Test...");

    const categoryId = crypto.randomUUID();

    const newCategory: Category = {
        id: categoryId,
        name: "Test Category"
    };

    let createdCategory: Category | null = null;
    try {
        console.log("Creating category...");
        createdCategory = await CategoryDBA.createCategory(newCategory);
        console.log("Category created successfully:", createdCategory);
    } catch (error) {
        console.error("Failed to create category:", error);
    }

    // Update
    createdCategory!.name = "Updated Test Category";
    let updatedCategory: Category | null = null;
    try {
        console.log("Updating category...");
        updatedCategory = await CategoryDBA.updateCategory(createdCategory!);
        console.log("Category updated successfully.");
    } catch (error) {
        console.error("Failed to update category:", error);
    }

    // Verify update using CategoryDBA methods
    try {
        console.log("Fetching category by ID...");
        const category = await CategoryDBA.getCategoryById(updatedCategory!.id);
        if (!category) {
            console.error("Category not found in DB!");
        } else {
            console.log("Category found in DB:", category);
            if (category.name === "Updated Test Category") {
                console.log("SUCCESS: Category name is Updated Test Category.");
            } else {
                console.error("FAILURE: Category name is not Updated Test Category, it is " + category.name);
            }
        }

        console.log("Fetching all categories...");
        const allCategories = await CategoryDBA.getAllCategories();
        console.log(`Found ${allCategories.length} categories.`);
        const found = allCategories.find((c: any) => c.id === updatedCategory!.id);
        if (found) {
            console.log("SUCCESS: Created category found in getAllCategories list.");
        } else {
            console.error("FAILURE: Created category NOT found in getAllCategories list.");
        }
    } catch (err) {
        console.error("Error verifying category:", err);
    }
};

const runTests = async () => {
    if (process.env.NODE_ENV !== "test") {
        console.error("Error: NODE_ENV is not set to 'test'");
        return;
    }

    await runTaskTest();
    console.log("\n\n");
    await runCategoryTest();
    TheDB.close();
};

runTests();
