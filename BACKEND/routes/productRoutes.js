import express from "express";
import {
  getColumnNames,
  getProductById,
  getProducts,
  addProduct,
  upload,
} from "../controllers/productController.js";

const router = express.Router();

router.get("/get-column-names", getColumnNames);
router.get("/get-product/:product_id", getProductById);
router.get("/get-products", getProducts);

// Use multer middleware for file upload on this route
router.post(
  "/add-product",
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
  ]),
  addProduct
);

export default router;
