import express from "express";
import { body } from "express-validator";
import { register, login, logout } from "../controllers/userController.js";
import tokenMiddleware from "../middlewares/tokenMiddleWare.js";

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

router.post("/logout", logout);
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

export default router;
