import express from "express";
import pkg from "pg";
import dotenv from "dotenv";
import multer from "multer";
import cors from "cors";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const app = express();
const port = 3000;
const { Pool } = pkg;

dotenv.config();

const pg = new Pool({
  host: "localhost",
  port: process.env.DB_PORT,
  user: process.env.DB_USER_NAME,
  password: process.env.DB_PASS,
  database: process.env.DB_BASE,
});

pg.connect()
  .then(() => console.log("Connected to database"))
  .catch((err) => console.error("Database connection failed:", err.stack));

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const SECRET_KEY = process.env.SECRET_KEY;

const jwtTokenMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "Invalid token" });
    }
    req.user = decoded;
    next();
  });
};

app.post("/register", async (req, res) => {
  const { firstname, lastname, email, phoneNumber, password, dob } = req.body;

  try {
    const userExists = await pg.query(
      "SELECT email FROM user_main WHERE email = $1",
      [email]
    );

    if (userExists.rows.length > 0) {
      return res
        .status(400)
        .json({ error: "User Already Exists, Please Login!" });
    }

    const hashPass = await bcrypt.hash(password, 10);

    await pg.query(
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
});

app.listen(port, () => {
  console.log(`Server running at port ${port}`);
});
