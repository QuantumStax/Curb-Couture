import express from "express";
import { body } from "express-validator";
import { register, login } from "../controllers/userController.js";

const router = express.Router();

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

export default router;
