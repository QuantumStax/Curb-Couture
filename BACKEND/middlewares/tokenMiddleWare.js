import { V2 } from "paseto";
import crypto from "crypto";
import dotenv from "dotenv";
dotenv.config();

// Helper to obtain the Ed25519 public key for verifying tokens
const getPublicKey = () => {
  const publicKeyPEM = process.env.PUBLIC_KEY;
  if (!publicKeyPEM) {
    throw new Error("PUBLIC_KEY is not defined in environment variables");
  }
  const formattedKey = publicKeyPEM.replace(/\\n/g, "\n");
  return crypto.createPublicKey(formattedKey);
};

const tokenMiddleware = async (req, res, next) => {
  console.log("Cookies received:", req.cookies);

  if (!req.cookies || !req.cookies.token) {
    return res.status(401).json({ error: "Unauthorized - No token found" });
  }
  try {
    const token = req.cookies.token;
    console.log("token : ", token);

    if (!token) {
      return res.status(401).json({ error: "No token provided" });
    }

    const publicKey = getPublicKey();
    // Verify the token using V2.verify with the Ed25519 public key
    const decoded = await V2.verify(token, publicKey);
    req.user = decoded;
    // res.status(200).json({isAuthenticated: true, user: decoded})
    next();
  } catch (error) {
    console.error("Error verifying token:", error);
    res.status(401).json({ error: "Invalid token" });
  }
};

export default tokenMiddleware;
