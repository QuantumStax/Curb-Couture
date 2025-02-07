import pool from "../config/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY;

export const register = async (req, res) => {
  const { firstname, lastname, email, phoneNumber, password, dob } = req.body;
  try {
    const userExists = await pool.query(
      "SELECT email FROM user_main WHERE email = $1",
      [email]
    );
    if (userExists.rows.length > 0) {
      return res
        .status(400)
        .json({ error: "User Already Exists, Please Login!" });
    }
    const hashPass = await bcrypt.hash(password, 10);
    await pool.query(
      "INSERT INTO user_main (first_name, last_name, dob, phone_num, email, password, role) VALUES ($1, $2, $3, $4, $5, $6, 'customer')",
      [firstname, lastname, dob, phoneNumber, email, hashPass]
    );
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Cannot register account. Please try again!" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await pool.query(
      "SELECT id, email, password FROM user_main WHERE email = $1",
      [email]
    );
    if (user.rows.length === 0) {
      return res.status(400).json({ message: "Invalid Username!!!" });
    }
    const match = await bcrypt.compare(password, user.rows[0].password);
    if (!match) {
      return res.status(400).send({ message: "Incorrect Password!!!" });
    }
    const token = jwt.sign(
      {
        email: user.rows[0].email,
        firstname: user.rows[0].first_name, // adjust query if these fields are needed
        lastname: user.rows[0].last_name,
        user_id: user.rows[0].id,
      },
      SECRET_KEY
    );
    res.status(200).json({ message: "Login Successful✅", token, email });
  } catch (error) {
    res.status(500).json({ message: "Error Logging in⚠️. Please try again" });
  }
};
