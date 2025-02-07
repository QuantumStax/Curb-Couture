import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Mount routes without a prefix so endpoints match the frontend
app.use("/", productRoutes);
app.use("/", userRoutes);

app.listen(port, () => {
  console.log(`Server running at port ${port}`);
});
