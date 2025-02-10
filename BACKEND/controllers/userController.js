import pool from "../config/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { body, validationResult } from "express-validator";
dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY;
const TOKEN_EXPIRY = process.env.TOKEN_EXPIRY || "2h";
const SALT_ROUNDS = 10;

export const register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { firstname, lastname, email, phoneNumber, password, dob } = req.body;
  if (!firstname || !lastname || !email || !password || !dob) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const userExists = await pool.query(
      "SELECT email FROM user_main WHERE email = $1",
      [email]
    );
    if (userExists.rows.length > 0) {
      return res
        .status(400)
        .json({ message: "User already exists. Please log in." });
    }

    const hashPass = await bcrypt.hash(password, SALT_ROUNDS);

    await pool.query(
      "INSERT INTO user_main (first_name, last_name, dob, phone_num, email, password, role) VALUES ($1, $2, $3, $4, $5, $6, 'customer')",
      [firstname, lastname, dob, phoneNumber, email, hashPass]
    );

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Registration error:", error);
    res
      .status(500)
      .json({ message: "Cannot register account. Please try again." });
  }
};

export const login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const userQuery = `
      SELECT id, email, password, first_name, last_name, role 
      FROM user_main 
      WHERE email = $1
    `;
    const userResult = await pool.query(userQuery, [email]);
    if (userResult.rows.length === 0) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const userData = userResult.rows[0];
    const match = await bcrypt.compare(password, userData.password);
    if (!match) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const payload = {
      user_id: userData.id,
      email: userData.email,
      firstname: userData.first_name,
      lastname: userData.last_name,
      role: userData.role
    };

    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: TOKEN_EXPIRY });

    res.status(200).json({ message: "Login Successful ✅", token });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Error logging in. Please try again." });
  }
};
