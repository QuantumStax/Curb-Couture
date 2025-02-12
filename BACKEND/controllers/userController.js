import pool from "../config/db.js";
import bcrypt from "bcrypt";
import { V2 } from "paseto";
import crypto from "crypto";
import ms from "ms";
import dotenv from "dotenv";
import { validationResult } from "express-validator";
dotenv.config();

const TOKEN_EXPIRY = process.env.TOKEN_EXPIRY || "3h";
const SALT_ROUNDS = Number(process.env.SALT_ROUNDS) || 10;

// Helper to obtain the Ed25519 private key for signing tokens

const getPrivateKey = () => {
  const privateKeyPEM = process.env.PRIVATE_KEY;
  if (!privateKeyPEM) {
    throw new Error("PRIVATE_KEY is not defined in environment variables");
  }
  const formattedKey = privateKeyPEM.replace(/\\n/g, "\n");
  return crypto.createPrivateKey(formattedKey);
};

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
      `INSERT INTO user_main 
        (first_name, last_name, dob, phone_num, email, password, role) 
       VALUES ($1, $2, $3, $4, $5, $6, 'customer')`,
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

    // Compute expiration as a Unix timestamp (in seconds) and convert to string
    const expiration = new Date(Date.now() + ms(TOKEN_EXPIRY)).toISOString();

    const payload = {
      user_id: userData.id,
      email: userData.email,
      firstname: userData.first_name,
      lastname: userData.last_name,
      role: userData.role,
      isAdmin: userData.role === "admin",
      exp: expiration,
    };

    const privateKey = getPrivateKey();
    // Sign the token using V2.sign with the Ed25519 private key
    const token = await V2.sign(payload, privateKey);

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: ms(TOKEN_EXPIRY),
    });

    // Build the user response without sensitive data
    const userResponse = {
      id: userData.id,
      email: userData.email,
      first_name: userData.first_name,
      last_name: userData.last_name,
      role: userData.role,
    };

    res
      .status(200)
      .json({ message: "Login Successful ✅", user: userResponse });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Error logging in. Please try again." });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).json({ message: "Logout successful! 😎" });
  } catch (error) {
    console.error("Error during logout:", error);
    res
      .status(500)
      .json({ message: "Error Logging out 😑. Please try again." });
  }
};
