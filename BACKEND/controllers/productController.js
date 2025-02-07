import pool from "../config/db.js";
import multer from "multer";

const storage = multer.memoryStorage();
export const upload = multer({ storage });

// Other controllers remain the same...

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
      sizeVariants.xxxl,
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
    // Return the product_id so that the frontend can update its state
    res
      .status(201)
      .json({
        message: "Product added successfully ✅",
        product: { product_id },
      });
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("Error adding product:", error);
    res.status(500).send("Error adding product details");
  } finally {
    client.release();
  }
};
