import sqlite3 from "sqlite3";
const sqlite = sqlite3.verbose();

import dotenv from "dotenv";
dotenv.config();

export const TheDB =
    new sqlite.Database(
        process.env.NODE_ENV === "test" ? process.env.TEST_DB_NAME as string : process.env.DB_NAME as string);