/**
 * @file tokenMiddleware.js
 * @description Middleware for verifying Paseto tokens using the Ed25519 public key.
 * It validates the token from the request cookies and attaches the decoded payload to req.user.
 */

import { V2 } from "paseto";
import crypto from "crypto";
import dotenv from "dotenv";

dotenv.config();

/**
 * Retrieves the Ed25519 public key from the environment variable for token verification.
 *
 * @returns {crypto.KeyObject} The public key object.
 * @throws {Error} If the PUBLIC_KEY environment variable is not defined.
 */
const getPublicKey = () => {
  const publicKeyPEM = process.env.PUBLIC_KEY;
  if (!publicKeyPEM) {
    throw new Error("PUBLIC_KEY is not defined in environment variables");
  }
  const formattedKey = publicKeyPEM.replace(/\\n/g, "\n");
  return crypto.createPublicKey(formattedKey);
};

/**
 * Middleware to verify the Paseto token present in the request cookies.
 *
 * This function checks for a token in the cookies, verifies it using the Ed25519 public key,
 * and attaches the decoded payload to req.user. If verification fails, it responds with an unauthorized error.
 *
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 * @param {Function} next - Callback to pass control to the next middleware.
 * @returns {Promise<void>}
 */
const tokenMiddleware = async (req, res, next) => {
  if (!req.cookies || !req.cookies.token) {
    return res.status(401).json({ error: "Unauthorized - No token found" });
  }
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ error: "No token provided" });
    }
    const publicKey = getPublicKey();
    const decoded = await V2.verify(token, publicKey);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
};

export default tokenMiddleware;
