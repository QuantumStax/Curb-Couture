/**
 * @file productRoutes.js
 * @description Defines the product-related routes for handling product retrieval, creation,
 * reviews, and search functionality. Utilizes token-based authentication middleware
 * for protected routes and supports file uploads for product images.
 */

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
import tokenMiddleware from "../middlewares/tokenMiddleWare.js";

const router = express.Router();

/**
 * @route GET /get-column-names
 * @description Retrieves filtered column names from the color_variants table.
 */
router.get("/get-column-names", getColumnNames);

/**
 * @route GET /get-product/:product_id
 * @description Retrieves detailed information for a product by its unique product ID.
 */
router.get("/get-product/:product_id", getProductById);

/**
 * @route GET /get-products
 * @description Retrieves a list of all available products.
 */
router.get("/get-products", getProducts);

/**
 * @route GET /review/:id
 * @description Retrieves reviews for a specific product using its ID.
 */
router.get("/review/:id", getReviewsByProductId);

/**
 * @route POST /submitReview/:id
 * @description Submits a review for a product. The user must be authenticated.
 * @middleware tokenMiddleware - Validates the user's token before submission.
 */
router.post("/submitReview/:id", tokenMiddleware, submitReview);

/**
 * @route POST /add-product
 * @description Adds a new product with images, sizes, colors, and additional details.
 * The route is protected and requires authentication. Handles multiple image uploads.
 * @middleware tokenMiddleware - Ensures the user is authenticated.
 * @middleware upload.fields - Manages file uploads for product images.
 */
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

/**
 * @route GET /search
 * @description Searches for products based on a query string provided as a query parameter.
 */
router.get("/search", searchProducts);

export default router;
