import sqlite3 from "sqlite3";
const sqlite = sqlite3.verbose();

export const TheDB = new sqlite.Database(process.env.DB_NAME as string);