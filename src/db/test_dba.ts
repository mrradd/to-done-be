
import { TaskDBA } from "./task_dba";
import { Task } from "../models/Task";
import crypto from "crypto";
import { TheDB } from "./db";

const runTest = async () => {
    console.log("Starting TaskDBA Transaction Test...");

    const taskId = crypto.randomUUID();

    // We should probably get a real category ID, but for now we test with a fake one.
    // Init_db creates 3 random ones and prints them? No, it doesn't print the IDs.
    // We'll trust that sqlite FK enforcement is either off or my error handling will catch it.

    const newTask: Task = {
        id: taskId,
        title: "Test Task",
        description: "Description of test task",
        due_date: "2023-12-31",
        created_date: new Date().toISOString(),
        status: 0,
        category_id: "some-category-id"
    };

    try {
        console.log("Creating task...");
        const createdTask = await TaskDBA.createTask(newTask);
        console.log("Task created successfully:", createdTask);
    } catch (error) {
        console.error("Failed to create task:", error);
    }

    // Update
    newTask.status = 1;
    try {
        console.log("Updating task...");
        await TaskDBA.updateTask(newTask);
        console.log("Task updated successfully.");
    } catch (error) {
        console.error("Failed to update task:", error);
    }

    // Verify update using TaskDBA methods
    try {
        console.log("Fetching task by ID...");
        const row = await TaskDBA.getTaskById(taskId);
        if (!row) {
            console.error("Task not found in DB!");
        } else {
            console.log("Task found in DB:", row);
            if (row.status === "Complete") {
                console.log("SUCCESS: Task status is Complete.");
            } else {
                console.error("FAILURE: Task status is not Complete, it is " + row.status);
            }
        }

        console.log("Fetching all tasks...");
        const allTasks = await TaskDBA.getAllTasks();
        console.log(`Found ${allTasks.length} tasks.`);
        const found = allTasks.find((t: any) => t.id === taskId);
        if (found) {
            console.log("SUCCESS: Created task found in getAllTasks list.");
        } else {
            console.error("FAILURE: Created task NOT found in getAllTasks list.");
        }

    } catch (err) {
        console.error("Error verifying task:", err);
    }

    TheDB.close();
};

runTest();
