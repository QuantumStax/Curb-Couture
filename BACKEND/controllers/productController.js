/* productController.js */
import pool from "../config/db.js";
import multer from "multer";

const storage = multer.memoryStorage();
export const upload = multer({ storage });

// Get column names from the "color_variants" table
export const getColumnNames = async (req, res) => {
  try {
    const query = `
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_name = 'color_variants';
    `;
    const result = await pool.query(query);
    const columnNames = result.rows.map((row) => row.column_name);
    const filteredColumns = columnNames.filter(
      (col) => col !== "color_id" && col !== "product_id"
    );
    res.status(200).json({ columns: filteredColumns });
  } catch (error) {
    console.error("Error fetching column names:", error); // Added error logging
    res.status(500).json({ message: "Error fetching colors!" });
  }
};

// Get a single product by its ID
export const getProductById = async (req, res) => {
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
    const result = await pool.query(productQuery, [product_id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Product not found" });
    }
    const product = result.rows[0];

    // Format images
    product.images = [
      product.image_1 ? `data:image/jpeg;base64,${product.image_1}` : null,
      product.image_2 ? `data:image/jpeg;base64,${product.image_2}` : null,
      product.image_3 ? `data:image/jpeg;base64,${product.image_3}` : null,
    ].filter((img) => img !== null);

    // Format sizes and colors
    const sizesArray = ["s", "m", "l", "xl", "xxl", "xxxl"];
    product.sizes = sizesArray.filter((size) => product[size]);

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

    // Remove raw columns
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
};

// Get list of products
export const getProducts = async (req, res) => {
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
    const result = await pool.query(gpQuery);
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
};

// Add a new product using a transaction to group related inserts
export const addProduct = async (req, res) => {
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

  const client = await pool.connect();
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
};

// Submit a product review
export const submitReview = async (req, res) => {
  const {id} = req.params;
  const { rating, title, review, termsAccepted } = req.body;
  console.log("product_id", id);
  console.log("rating", rating);
  console.log("title", title);
  console.log("review", review);
  console.log("termsAccepted", termsAccepted);
  
  // Changed: Extract user_id from req.user (assuming jwtTokenMiddleware sets req.user)
  const { user_id } = req.user || {};
  console.log("user id : ", user_id);
  
  if (!id || !rating || !title || !review) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  if (!user_id) {
    console.log("Unauthorized user!!!");
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const query = `
      INSERT INTO product_reviews 
        (product_id, id, rating, title, review, tnc, created_at)
      VALUES 
        ($1, $2, $3, $4, $5, $6, NOW())
      RETURNING *
    `;
    const values = [id, user_id, rating, title, review, termsAccepted];
    const result = await pool.query(query, values);
    res.status(201).json({
      message: "Review submitted successfully",
      review: result.rows[0],
    });
  } catch (error) {
    console.error("Error submitting review:", error);
    res.status(500).json({ message: "Error submitting review" });
  }
};

// Get reviews for a given product by its ID
export const getReviewsByProductId = async (req, res) => {
  const { id } = req.params;
  try {
    const query = `
      SELECT 
        product_id, id, rating, title, review, tnc, created_at
      FROM product_reviews
      WHERE product_id = $1
    `;
    const result = await pool.query(query, [id]);
    res.status(200).json({ reviews: result.rows });
  } catch (error) {
    console.error("Error fetching reviews:", error);
    res.status(500).json({ message: "Error fetching reviews!" });
  }
};
