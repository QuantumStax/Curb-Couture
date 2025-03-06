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

    // Compute expiration as an ISO string
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
    const token = await V2.sign(payload, privateKey);
    console.log("Login token : ", token);
    

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: ms(TOKEN_EXPIRY),
      path: "/",
    });

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
    res.status(500).json({ message: "Error logging in. Please try again." });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      path: "/",
    });
    res.status(200).json({ message: "Logout successful! 😎" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error Logging out 😑. Please try again." });
  }
};

/**
 * Fetch addresses for the current logged in user.
 * Requires tokenMiddleware to set req.user.
 */
export const fetchAddress = async (req, res) => {
  const user_id = req.user.user_id;

  try {
    const query = `SELECT * FROM user_address WHERE user_id = $1 ORDER BY created_at DESC`;
    const { rows } = await pool.query(query, [user_id]);
    console.log("Result Rows - fetch Address : ", rows);

    res.status(200).json(rows);
  } catch (error) {
    console.error("Error fetching addresses:", error);
    res.status(500).json({ message: "Error fetching addresses" });
  }
};

/**
 * Add a new address for the current logged in user.
 * Expects address fields in the request body.
 */
export const addAddress = async (req, res) => {
  if (!req.user || !req.user.user_id) {
    return res.status(401).json({ message: "Unauthorized: Missing user info" });
  }
  const user_id = req.user.user_id;
  const {
    label,
    firstname,
    lastname,
    country,
    state,
    district,
    locality,
    pincode,
  } = req.body;

  if (
    !label ||
    !firstname ||
    !lastname ||
    !country ||
    !state ||
    !district ||
    !locality ||
    !pincode
  ) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const query = `
      INSERT INTO user_address (user_id, country, state, district, locality, pincode, created_at, label, firstname, lastname)
      VALUES ($1, $2, $3, $4, $5, $6, NOW(), $7, $8, $9)
      RETURNING *
    `;

    const { rows } = await pool.query(query, [
      user_id,
      country,
      state,
      district,
      locality,
      pincode,
      label,
      firstname,
      lastname,
    ]);

    res
      .status(201)
      .json({ message: "Address added successfully", address: rows[0] });
  } catch (error) {
    console.error("Error adding address:", error);
    res.status(500).json({ message: "Error adding address" });
  }
};

/**
 * Edit an address for the current logged in user.
 * Expects the addressId as a route parameter and updated fields in the request body.
 */
export const editAddress = async (req, res) => {
  const user_id = req.user.id;
  const { addressId } = req.params;
  const {
    label,
    firstname,
    lastname,
    country,
    state,
    district,
    locality,
    pincode,
  } = req.body;

  if (
    !label ||
    !firstname ||
    !lastname ||
    !country ||
    !state ||
    !district ||
    !locality ||
    !pincode
  ) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const query = `
      UPDATE user_address
      SET label = $1,
          firstname = $2,
          lastname = $3,
          country = $4,
          state = $5,
          district = $6,
          locality = $7,
          pincode = $8
      WHERE addR_id = $9 AND user_id = $10
      RETURNING *
    `;
    const values = [
      label,
      firstname,
      lastname,
      country,
      state,
      district,
      locality,
      pincode,
      addressId,
      user_id,
    ];
    const { rows } = await pool.query(query, values);
    if (rows.length === 0) {
      return res
        .status(404)
        .json({ message: "Address not found or unauthorized" });
    }
    res
      .status(200)
      .json({ message: "Address updated successfully", address: rows[0] });
  } catch (error) {
    console.error("Error updating address:", error);
    res.status(500).json({ message: "Error updating address" });
  }
};

/**
 * Delete an address for the current logged in user.
 * Expects the addressId as a route parameter.
 */
export const deleteAddress = async (req, res) => {
  const user_id = req.user.id;
  const { addressId } = req.params;

  try {
    const query = `
      DELETE FROM user_address
      WHERE addR_id = $1 AND user_id = $2
      RETURNING *
    `;
    const { rows } = await pool.query(query, [addressId, user_id]);
    if (rows.length === 0) {
      return res
        .status(404)
        .json({ message: "Address not found or unauthorized" });
    }
    res
      .status(200)
      .json({ message: "Address deleted successfully", address: rows[0] });
  } catch (error) {
    console.error("Error deleting address:", error);
    res.status(500).json({ message: "Error deleting address" });
  }
};
