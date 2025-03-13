/**
 * @file server.js
 * @description Entry point for the Express application. This server configures middleware for CORS,
 * cookie parsing, and request body parsing. It registers product and user routes, then starts listening
 * on the defined port.
 */

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", productRoutes);
app.use("/", userRoutes);

app.listen(port, () => {
  console.log(`Server running at port ${port}`);
});
