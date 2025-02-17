/* productRoutes.js */
import express from "express";
import {
  getColumnNames,
  getProductById,
  getProducts,
  addProduct,
  submitReview,
  getReviewsByProductId,
  upload,
  searchProducts,
} from "../controllers/productController.js";

const router = express.Router();
import tokenMiddleware from "../middlewares/tokenMiddleWare.js";

router.get("/get-column-names", getColumnNames);
router.get("/get-product/:product_id", getProductById);
router.get("/get-products", getProducts);
router.get("/review/:id", getReviewsByProductId);
router.post("/submitReview/:id", tokenMiddleware, submitReview);

router.post(
  "/add-product",
  tokenMiddleware,
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
  ]),
  addProduct
);

router.get("/search", searchProducts);

export default router;
