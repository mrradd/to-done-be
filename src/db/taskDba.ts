import { Task } from "../models/Task";
import { TheDB } from "./theDb";
/**
 * Data Access Object for Tasks.
 */
export class TaskDBA {
    static getAllTasks(): Promise<Task[]> {
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

    static getTaskById(id: string): Promise<Task> {
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
                    INSERT INTO tasks (
                        id,
                        title,
                        description,
                        due_date,
                        created_date,
                        status,
                        category_id
                    )
                    VALUES (?, ?, ?, ?, ?, ?, ?);
                `;

                task.id = crypto.randomUUID();
                TheDB.run(sql, [
                    task.id,
                    task.title,
                    task.description,
                    task.due_date,
                    new Date().toUTCString(),
                    task.status,
                    task.category_id
                ], (err) => {

                    if (err) {
                        console.error("Error in createTask:", err);
                        TheDB.run("ROLLBACK", () => reject(err));
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

    static updateTask(task: Task): Promise<Task> {
        return new Promise((resolve, reject) => {
            TheDB.serialize(() => {
                TheDB.run("BEGIN TRANSACTION");

                const sql = `
                    UPDATE tasks
                    SET title = ?,
                        description = ?,
                        due_date = ?,
                        status = ?,
                        category_id = ?
                    WHERE id = ?
                `;

                TheDB.run(sql, [
                    task.title,
                    task.description,
                    task.due_date,
                    task.status,
                    task.category_id,
                    task.id
                ], (err) => {
                    if (err) {
                        console.error("Error in updateTask:", err);
                        TheDB.run("ROLLBACK", () => reject(err));
                    }

                    TheDB.run("COMMIT", (err) => {
                        if (err) {
                            console.error("Error committing update transaction:", err);
                            reject(err);
                        } else {
                            resolve(task);
                        }
                    });
                });
            });
        });
    }

    static deleteTask(id: string): Promise<string> {
        return new Promise((resolve, reject) => {
            TheDB.run("DELETE FROM tasks WHERE id = ?;", [id], (err) => {
                if (err) {
                    console.error("Error in deleteTask:", err);
                    reject(err);
                } else {
                    resolve(id);
                }
            });
        });
    }
}