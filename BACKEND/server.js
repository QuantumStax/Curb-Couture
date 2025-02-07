import express from "express";
import pkg from "pg";
import dotenv from "dotenv";
import multer from "multer";
import cors from "cors";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

dotenv.config();

const app = express();
const port = 3000;
const { Pool } = pkg;

// Configure pool with performance-tuned settings
const pg = new Pool({
  host: "localhost",
  port: process.env.DB_PORT,
  user: process.env.DB_USER_NAME,
  password: process.env.DB_PASS,
  database: process.env.DB_BASE,
  max: 20, // maximum number of connections
  idleTimeoutMillis: 30000, // close idle clients after 30 seconds
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

// get column names
app.get("/get-column-names", async (req, res) => {
  try {
    const query = `
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_name = 'color_variants';
    `;
    const result = await pg.query(query);
    const columnNames = result.rows.map((row) => row.column_name);
    const filteredColumns = columnNames.filter(
      (col) => col !== "color_id" && col !== "product_id"
    );
    res.status(200).json({ columns: filteredColumns });
  } catch (error) {
    res.status(500).json({ message: "Error fetching colors!" });
  }
});

// get product details by product_id
app.get("/get-product/:product_id", async (req, res) => {
  const { product_id } = req.params;
  try {
    const productQuery = `
      SELECT 
        pm.product_id, 
        pm.name, 
        pm.description, 
        pm.price, 
        pm.rating, 
        pm.category, 
        encode(pi.image_1, 'base64') AS image_1,
        encode(pi.image_2, 'base64') AS image_2,
        encode(pi.image_3, 'base64') AS image_3,
        sv.s, sv.m, sv.l, sv.xl, sv.xxl, sv.xxxl,
        cv.green, cv.blue, cv.red, cv.black, cv.grey, cv.neon, cv.orange, cv.yellow,
        pi_info.material, pi_info.desc_1, pi_info.description_2, pi_info.type, pi_info.occation, pi_info.sleeve_length
      FROM product_main pm
      LEFT JOIN product_images pi ON pm.product_id = pi.product_id
      LEFT JOIN size_variants sv ON pm.product_id = sv.product_id
      LEFT JOIN color_variants cv ON pm.product_id = cv.product_id
      LEFT JOIN product_info pi_info ON pm.product_id = pi_info.product_id
      WHERE pm.product_id = $1
    `;
    const result = await pg.query(productQuery, [product_id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Product not found" });
    }
    const product = result.rows[0];

    // Convert images into an array and remove null values
    product.images = [
      product.image_1 ? `data:image/jpeg;base64,${product.image_1}` : null,
      product.image_2 ? `data:image/jpeg;base64,${product.image_2}` : null,
      product.image_3 ? `data:image/jpeg;base64,${product.image_3}` : null,
    ].filter((img) => img !== null);

    // Convert sizes into an array
    const sizesArray = ["s", "m", "l", "xl", "xxl", "xxxl"];
    product.sizes = sizesArray.filter((size) => product[size]);

    // Convert colors into an array
    const colorsArray = [
      "green",
      "blue",
      "red",
      "black",
      "grey",
      "neon",
      "orange",
      "yellow",
    ];
    product.colors = colorsArray.filter((color) => product[color]);

    // Remove raw size, color, and image columns
    delete product.image_1;
    delete product.image_2;
    delete product.image_3;
    sizesArray.forEach((size) => delete product[size]);
    colorsArray.forEach((color) => delete product[color]);

    res.status(200).json(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({ message: "Error fetching product!" });
  }
});

app.get("/get-products", async (req, res) => {
  try {
    const gpQuery = `
      SELECT 
        pm.product_id, 
        pm.name, 
        pm.description, 
        pm.price, 
        pm.rating, 
        pm.category, 
        encode(pi.image_1, 'base64') AS image_1,
        encode(pi.image_2, 'base64') AS image_2,
        encode(pi.image_3, 'base64') AS image_3
      FROM product_main pm
      LEFT JOIN product_images pi ON pm.product_id = pi.product_id
    `;
    const result = await pg.query(gpQuery);
    const products = result.rows.map((product) => ({
      ...product,
      images: [
        product.image_1 ? `data:image/jpeg;base64,${product.image_1}` : null,
        product.image_2 ? `data:image/jpeg;base64,${product.image_2}` : null,
        product.image_3 ? `data:image/jpeg;base64,${product.image_3}` : null,
      ].filter((img) => img !== null),
    }));
    res.status(200).json({ products });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Error fetching products!" });
  }
});

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
        // Note: first_name and last_name are not selected in the query.
        // If needed, adjust the SELECT statement accordingly.
        firstname: user.rows[0].first_name,
        lastname: user.rows[0].last_name,
        user_id: user.rows[0].id,
      },
      SECRET_KEY
    );
    res.status(200).json({ message: "Login Successful✅", token, email });
  } catch (error) {
    res.status(500).json({ message: "Error Logging in⚠️. Please try again" });
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
    const {
      product_name,
      description,
      price,
      rating,
      category,
      sizes,
      colors,
      fabric,
      occasion,
      type,
      sleeve,
      desc_1,
      desc_2,
    } = req.body;

    const parsedSizes = JSON.parse(sizes);
    const parsedColors = JSON.parse(colors);

    // Use reusable arrays to avoid repetition
    const sizesArray = ["s", "m", "l", "xl", "xxl", "xxxl"];
    const colorsArray = [
      "green",
      "blue",
      "red",
      "black",
      "grey",
      "neon",
      "orange",
      "yellow",
    ];

    const sizeVariants = sizesArray.reduce((obj, size) => {
      obj[size] = parsedSizes.includes(size);
      return obj;
    }, {});

    const color_variants = colorsArray.reduce((obj, color) => {
      obj[color] = parsedColors.includes(color);
      return obj;
    }, {});

    const image1 = req.files["image1"] ? req.files["image1"][0].buffer : null;
    const image2 = req.files["image2"] ? req.files["image2"][0].buffer : null;
    const image3 = req.files["image3"] ? req.files["image3"][0].buffer : null;

    if (!product_name || !description || !price || !rating || !category) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Use a transaction to group the multi-step product insertion
    const client = await pg.connect();
    try {
      await client.query("BEGIN");

      const add_product_query = `
        INSERT INTO product_main (name, description, price, rating, category)
        VALUES ($1, $2, $3, $4, $5) RETURNING product_id
      `;
      const productResult = await client.query(add_product_query, [
        product_name,
        description,
        price,
        rating,
        category,
      ]);
      const product_id = productResult.rows[0].product_id;

      const add_product_img_query = `
        INSERT INTO product_images (product_id, image_1, image_2, image_3)
        VALUES ($1, $2, $3, $4)
      `;
      await client.query(add_product_img_query, [
        product_id,
        image1,
        image2,
        image3,
      ]);

      const add_product_size_query = `
        INSERT INTO size_variants (product_id, s, m, l, xl, xxl, xxxl)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
      `;
      await client.query(add_product_size_query, [
        product_id,
        sizeVariants.s,
        sizeVariants.m,
        sizeVariants.l,
        sizeVariants.xl,
        sizeVariants.xxl,
        sizeVariants.xxxl,
      ]);

      const add_product_color_query = `
        INSERT INTO color_variants (product_id, green, blue, red, black, grey, neon, orange, yellow)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      `;
      await client.query(add_product_color_query, [
        product_id,
        color_variants.green,
        color_variants.blue,
        color_variants.red,
        color_variants.black,
        color_variants.grey,
        color_variants.neon,
        color_variants.orange,
        color_variants.yellow,
      ]);

      const add_info_query = `
        INSERT INTO product_info (product_id, material, desc_1, description_2, type, occation, sleeve_length)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
      `;
      await client.query(add_info_query, [
        product_id,
        fabric,
        desc_1,
        desc_2,
        type,
        occasion,
        sleeve,
      ]);

      await client.query("COMMIT");
      res.status(201).json({ message: "Product added successfully ✅" });
    } catch (error) {
      await client.query("ROLLBACK");
      console.error("Error adding product:", error);
      res.status(500).send("Error adding product details");
    } finally {
      client.release();
    }
  }
);

app.listen(port, () => {
  console.log(`Server running at port ${port}`);
});
