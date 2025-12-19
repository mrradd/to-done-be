import { TheDB } from "./db";
import crypto from "crypto";

/**
 * Initializes the database with the necessary tables and default categories.
 */
export const initDB = () => {
    try {
        TheDB.serialize(() => {
            console.log("Initializing database...");
            console.log("Creating Categories table...");
            TheDB.run(`
                CREATE TABLE IF NOT EXISTS categories (
                    id TEXT PRIMARY KEY,
                    name TEXT NOT NULL
                );
            `, (err) => {
                if (err) console.error("Error creating categories table:", err);
                else console.log("Categories table created successfully");
            });

            console.log("Creating Tasks table...");
            TheDB.run(`
                CREATE TABLE IF NOT EXISTS tasks (
                    id TEXT PRIMARY KEY,
                    title TEXT NOT NULL,
                    description TEXT,
                    due_date TEXT,
                    created_date TEXT NOT NULL,
                    status TEXT NOT NULL,
                    category_id TEXT,
                    FOREIGN KEY (category_id) REFERENCES categories(id)
                );
            `, (err) => {
                if (err) console.error("Error creating tasks table:", err);
                else console.log("Tasks table created successfully");
            });

            console.log("Inserting default categories...");
            TheDB.run(`
                INSERT INTO categories (id, name) VALUES
                ('${crypto.randomUUID()}', 'Personal'),
                ('${crypto.randomUUID()}', 'Work'),
                ('${crypto.randomUUID()}', 'School');
            `, (err) => {
                if (err) console.error("Error inserting categories:", err);
                else console.log("Default categories added successfully");
            });
        });
    }
    catch (error) {
        console.log("Database initialization failed");
        console.error(error);
    }
    finally {
        console.log("Database initialized successfully");
        TheDB.close();
    }
}

initDB();