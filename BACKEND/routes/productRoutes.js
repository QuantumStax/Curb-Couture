/* productRoutes.js */
import express from "express";
import {
  getColumnNames,
  getProductById,
  getProducts,
  addProduct,
  submitReview, // Added: Import submitReview
  getReviewsByProductId, // Added: Import getReviewsByProductId
  upload,
} from "../controllers/productController.js";
import jwtTokenMiddleware from "../middlewares/jwtTokenMiddleware.js";

const router = express.Router();

router.get("/get-column-names", getColumnNames);
router.get("/get-product/:product_id", getProductById);
router.get("/get-products", getProducts);
router.get("/review/:id", getReviewsByProductId);
router.post("/submitReview", jwtTokenMiddleware, submitReview);

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
