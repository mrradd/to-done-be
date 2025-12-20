import { Category } from "../models/Category";
import { Task } from "../models/Task";
import { TheDB } from "./theDb";

/**
 * Data Access Object for Tasks.
 */
export class CategoryDBA {
    static getAllCategories(): Promise<Category[]> {
        return new Promise((resolve, reject) => {
            TheDB.all("SELECT * FROM categories;", (err, rows: Category[]) => {
                if (err) {
                    console.log("Error in getAllCategories");
                    console.error(err);
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }

    static getCategoryById(id: string): Promise<Category> {
        return new Promise((resolve, reject) => {
            TheDB.get("SELECT * FROM categories WHERE id = ?;", [id], (err, row: Category) => {
                if (err) {
                    console.log("Error in getCategoryById");
                    console.error(err);
                    reject(err);
                } else {
                    resolve(row);
                }
            });
        });
    }

    static createCategory(category: Category): Promise<Category> {
        return new Promise((resolve, reject) => {
            TheDB.serialize(() => {
                TheDB.run("BEGIN TRANSACTION");

                const sql = `
                    INSERT INTO categories (id, name)
                    VALUES (?, ?)
                `;

                TheDB.run(sql, [
                    category.id,
                    category.name
                ], (err) => {

                    if (err) {
                        console.error("Error in createCategory:", err);
                        TheDB.run("ROLLBACK", () => reject(err));
                    }

                    TheDB.run("COMMIT", (err) => {
                        if (err) {
                            console.error("Error committing create transaction:", err);
                            reject(err);
                        } else {
                            resolve(category);
                        }
                    });
                });
            });
        });
    }

    static updateCategory(category: Category): Promise<Category> {
        return new Promise((resolve, reject) => {
            TheDB.serialize(() => {
                TheDB.run("BEGIN TRANSACTION");

                const sql = `
                    UPDATE categories
                    SET name = ?
                    WHERE id = ?
                `;

                TheDB.run(sql, [
                    category.name,
                    category.id
                ], (err) => {
                    if (err) {
                        console.error("Error in updateCategory:", err);
                        TheDB.run("ROLLBACK", () => reject(err));
                    }

                    TheDB.run("COMMIT", (err) => {
                        if (err) {
                            console.error("Error committing update transaction:", err);
                            reject(err);
                        } else {
                            resolve(category);
                        }
                    });
                });
            });
        });
    }

    static deleteCategory(id: string): Promise<string> {
        return new Promise((resolve, reject) => {
            TheDB.run("DELETE FROM categories WHERE id = ?;", [id], (err) => {
                if (err) {
                    console.error("Error in deleteCategory:", err);
                    reject(err);
                } else {
                    resolve(id);
                }
            });
        });
    }
}