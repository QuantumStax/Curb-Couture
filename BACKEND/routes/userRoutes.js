/**
 * @file userRoutes.js
 * @description Defines routes for user authentication and address management.
 * This includes registration, login, logout, token validation, and CRUD operations for user addresses.
 * Input validation is performed using express-validator, and protected routes require a valid token via tokenMiddleware.
 */

import express from "express";
import { body } from "express-validator";
import tokenMiddleware from "../middlewares/tokenMiddleWare.js";
import {
  register,
  login,
  logout,
  fetchAddress,
  addAddress,
  editAddress,
  deleteAddress,
} from "../controllers/userController.js";

const router = express.Router();

/**
 * @route POST /register
 * @description Registers a new user.
 * Validates required fields: firstname, lastname, email, password (min 8 characters), and dob.
 */
router.post(
  "/register",
  [
    body("firstname").trim().notEmpty().withMessage("First name is required"),
    body("lastname").trim().notEmpty().withMessage("Last name is required"),
    body("email")
      .isEmail()
      .normalizeEmail()
      .withMessage("Valid email is required"),
    body("phoneNumber").optional().trim(),
    body("password")
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters long"),
    body("dob").isDate().withMessage("Date of birth must be a valid date"),
  ],
  register
);

/**
 * @route POST /login
 * @description Authenticates a user and establishes a session.
 * Validates required fields: email and password.
 */
router.post(
  "/login",
  [
    body("email")
      .isEmail()
      .normalizeEmail()
      .withMessage("Valid email is required"),
    body("password").notEmpty().withMessage("Password is required"),
  ],
  login
);

/**
 * @route POST /logout
 * @description Logs out the current user.
 */
router.post("/logout", logout);

/**
 * @route GET /validate
 * @description Validates the authentication token.
 * If a token is provided and valid, returns user authentication status and user data.
 */
router.get(
  "/validate",
  (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
      return res.status(200).json({ isAuthenticated: false, user: null });
    }
    next();
  },
  tokenMiddleware,
  (req, res) => {
    res.status(200).json({ isAuthenticated: true, user: req.user });
  }
);

/**
 * @route GET /addresses
 * @description Retrieves the addresses associated with the authenticated user.
 * Protected route that requires a valid token.
 */
router.get("/addresses", tokenMiddleware, fetchAddress);

/**
 * @route POST /add-address
 * @description Adds a new address for the authenticated user.
 * Protected route that requires a valid token.
 */
router.post("/add-address", tokenMiddleware, addAddress);

/**
 * @route PUT /edit-address/:addressId
 * @description Updates an existing address for the authenticated user using the provided addressId.
 * Protected route that requires a valid token.
 */
router.put("/edit-address/:addressId", tokenMiddleware, editAddress);

/**
 * @route DELETE /delete-address/:addressId
 * @description Deletes an address for the authenticated user identified by addressId.
 * Protected route that requires a valid token.
 */
router.delete("/delete-address/:addressId", tokenMiddleware, deleteAddress);

export default router;
