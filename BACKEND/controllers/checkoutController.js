import pool from "../config/db.js";
import { validationResult } from "express-validator";

/**
 * Saves shipping details for the authenticated user.
 *
 * Expected request body format:
 * {
 *   address: {
 *     label: string,
 *     addressLine1: string,
 *     addressLine2: string,
 *     city: string,
 *     state: string,
 *     zipCode: string
 *   }
 * }
 *
 * @param {object} req - Express request object (must include req.user).
 * @param {object} res - Express response object.
 * @returns {Promise<void>} JSON response with the saved shipping details or an error message.
 */
export const addShippingDetails = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { address } = req.body;
  if (!address) {
    return res.status(400).json({ message: "Address details are required." });
  }
  try {
    const result = await pool.query(
      `INSERT INTO shipping_details 
         (user_id, label, address_line1, address_line2, city, state, zip_code)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING *`,
      [
        req.user.id,
        address.label,
        address.addressLine1,
        address.addressLine2,
        address.city,
        address.state,
        address.zipCode,
      ]
    );
    res.status(201).json({
      message: "Shipping details saved successfully",
      shipping: result.rows[0],
    });
  } catch (err) {
    console.error("Error in addShippingDetails:", err);
    res
      .status(500)
      .json({ message: "Error saving shipping details. Please try again." });
  }
};

/**
 * Validates a coupon code for a specific product.
 *
 * Expected request body format:
 * {
 *   coupon: string,
 *   productId: any
 * }
 *
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 * @returns {Promise<void>} JSON response with the discount amount.
 */
export const validateCoupon = async (req, res) => {
  const { coupon, productId } = req.body;
  try {
    let discount = 0;
    if (coupon === "SAVE50") {
      discount = 50;
    }
    res.status(200).json({ discount });
  } catch (err) {
    console.error("Error in validateCoupon:", err);
    res
      .status(500)
      .json({ message: "Error validating coupon. Please try again." });
  }
};

/**
 * Processes billing information following a successful payment and generates a receipt.
 *
 * Expected request body format:
 * {
 *   paymentId: string,
 *   orderId: string,
 *   product: { id: any, name: string, ... },
 *   finalPrice: number
 * }
 *
 * @param {object} req - Express request object (must include req.user).
 * @param {object} res - Express response object.
 * @returns {Promise<void>} JSON response with the generated receipt or an error message.
 */
export const processBilling = async (req, res) => {
  const { paymentId, orderId, product, finalPrice } = req.body;
  if (!paymentId || !orderId || !product || !finalPrice) {
    return res
      .status(400)
      .json({ message: "Missing required billing/payment details." });
  }
  try {
    const billingResult = await pool.query(
      `INSERT INTO billing_details 
         (user_id, product_id, payment_id, order_id, final_price)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [req.user.id, product.id, paymentId, orderId, finalPrice]
    );
    const billingId = billingResult.rows[0].id;
    const receiptData = {
      orderId,
      paymentId,
      productName: product.name,
      finalPrice,
      date: new Date(),
    };
    const receiptResult = await pool.query(
      `INSERT INTO receipts 
         (user_id, billing_id, receipt_data)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [req.user.id, billingId, JSON.stringify(receiptData)]
    );
    res.status(201).json({
      message: "Billing processed and receipt generated successfully",
      receipt: receiptResult.rows[0],
    });
  } catch (err) {
    console.error("Error in processBilling:", err);
    res
      .status(500)
      .json({ message: "Error processing billing details. Please try again." });
  }
};

/**
 * Retrieves a receipt by its identifier.
 *
 * Expected request parameters:
 * {
 *   receiptId: string
 * }
 *
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 * @returns {Promise<void>} JSON response with the receipt data or an error message.
 */
export const getReceipt = async (req, res) => {
  const { receiptId } = req.params;
  try {
    const receiptResult = await pool.query(
      `SELECT * FROM receipts WHERE id = $1`,
      [receiptId]
    );
    if (receiptResult.rows.length === 0) {
      return res.status(404).json({ message: "Receipt not found." });
    }
    res.status(200).json({ receipt: receiptResult.rows[0] });
  } catch (err) {
    console.error("Error in getReceipt:", err);
    res
      .status(500)
      .json({ message: "Error retrieving receipt. Please try again." });
  }
};
