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

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await pg.query(
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
        firstname: user.rows[0].first_name,
        lastname: user.rows[0].last_name,
        user_id: user.rows[0].id,
      },
      SECRET_KEY
    );

    res.status(200).json({ message: "Login Successful✅", token, email });
  } catch (error) {
    res.status(500).json({ message: "Error Logging in⚠️. PLease try again" });
  }
});

// post route for adding product to inventory
app.post(
  "/add-product",
  // jwtTokenMiddleware,
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
  ]),
  async (req, res) => {

    const { product_name, description, price, rating, category } = req.body;
    const image1 = req.files["image1"] ? req.files["image1"][0].buffer : null;
    const image2 = req.files["image2"] ? req.files["image2"][0].buffer : null;
    const image3 = req.files["image3"] ? req.files["image3"][0].buffer : null;

    if (!product_name || !description || !price || !rating || !category) {
      return res.status(400).json({ message: "All fields are required" });
    }

    try {
      const add_product_query = `
        INSERT INTO product_main (name, description, price, rating, category)
        VALUES ($1, $2, $3, $4, $5) RETURNING product_id
      `;
      const productResult = await pg.query(add_product_query, [
        product_name,
        description,
        price,
        rating,
        category,
      ]);
      const product_id = productResult.rows[0].product_id;

      // Insert images into product_images table
      const add_product_img_query = `
        INSERT INTO product_images (product_id, image_1, image_2, image_3)
        VALUES ($1, $2, $3, $4)
      `;
      await pg.query(add_product_img_query, [
        product_id,
        image1,
        image2,
        image3,
      ]);

      res.status(201).json({ message: "Product added successfully ✅" });
    } catch (error) {
      console.error("Error adding product:", error);
      res.status(500).send("Error adding product details");
    }
  }
);

app.listen(port, () => {
  console.log(`Server running at port ${port}`);
});
