import { Task } from "../models/Task";
import { TheDB } from "./db";
/**
 * Data Access Object for Tasks.
 */
export class TaskDBA {
    static getAllTasks(): Promise<any[]> {
        return new Promise((resolve, reject) => {
            TheDB.all("SELECT * FROM tasks;", (err, rows: Task[]) => {
                if (err) {
                    console.log("Error in getAllTasks");
                    console.error(err);
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }

    static getTaskById(id: string): Promise<any> {
        return new Promise((resolve, reject) => {
            TheDB.get("SELECT * FROM tasks WHERE id = ?;", [id], (err, row: Task) => {
                if (err) {
                    console.log("Error in getTaskById");
                    console.error(err);
                    reject(err);
                } else {
                    resolve(row);
                }
            });
        });
    }

    static createTask(task: Task): Promise<Task> {
        return new Promise((resolve, reject) => {
            TheDB.serialize(() => {
                TheDB.run("BEGIN TRANSACTION");

                const sql = `
                    INSERT INTO tasks (id, title, description, due_date, created_date, status, category_id)
                    VALUES (?, ?, ?, ?, ?, ?, ?)
                `;

                TheDB.run(sql, [
                    task.id,
                    task.title,
                    task.description,
                    task.due_date,
                    task.created_date,
                    task.status,
                    task.category_id
                ], (err) => {

                    if (err) {
                        console.error("Error in createTask:", err);
                        TheDB.run("ROLLBACK", () => reject(err));
                        return;
                    }

                    TheDB.run("COMMIT", (err) => {
                        if (err) {
                            console.error("Error committing create transaction:", err);
                            reject(err);
                        } else {
                            resolve(task);
                        }
                    });
                });
            });
        });
    }

    static updateTask(task: Task): Promise<void> {
        return new Promise((resolve, reject) => {
            TheDB.serialize(() => {
                TheDB.run("BEGIN TRANSACTION");

                const sql = `
                    UPDATE tasks
                    SET title = ?, description = ?, due_date = ?, created_date = ?, status = ?, category_id = ?
                    WHERE id = ?
                `;

                TheDB.run(sql, [
                    task.title,
                    task.description,
                    task.due_date,
                    task.created_date,
                    task.status,
                    task.category_id,
                    task.id
                ], (err) => {
                    if (err) {
                        console.error("Error in updateTask:", err);
                        TheDB.run("ROLLBACK", () => reject(err));
                        return;
                    }

                    TheDB.run("COMMIT", (err) => {
                        if (err) {
                            console.error("Error committing update transaction:", err);
                            reject(err);
                        } else {
                            resolve();
                        }
                    });
                });
            });
        });
    }

    static deleteTask(id: string) {

    }
}