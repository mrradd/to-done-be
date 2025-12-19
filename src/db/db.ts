import sqlite3 from "sqlite3";
const sqlite = sqlite3.verbose();

import dotenv from "dotenv";
dotenv.config();

export const TheDB = new sqlite.Database(process.env.DB_NAME as string);