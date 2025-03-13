/**
 * @file db.js
 * @description Initializes and exports a PostgreSQL connection pool using the 'pg' package.
 * The connection parameters are loaded from environment variables using dotenv.
 * The pool is configured with a maximum of 20 connections and an idle timeout of 30 seconds.
 * Upon initialization, the module attempts to establish a connection and logs the connection status.
 */

import pkg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pkg;

const pool = new Pool({
  host: "localhost",
  port: process.env.DB_PORT,
  user: process.env.DB_USER_NAME,
  password: process.env.DB_PASS,
  database: process.env.DB_BASE,
  max: 20,
  idleTimeoutMillis: 30000,
});

pool
  .connect()
  .then(() => console.log("Connected to database"))
  .catch((err) => console.error("Database connection failed:", err.stack));

export default pool;
