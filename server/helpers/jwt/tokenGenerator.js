import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

// JWT CONFIGURATIONS
export const MAX_AGE = 3 * 24 * 60 * 60; // 3 Days (in seconds)
const TOKEN_SECRET_KEY = process.env.REACT_APP_TOKEN_SECRET_KEY || "mohamedRezq";

export const createToken = (param) => {
  return jwt.sign({ param }, TOKEN_SECRET_KEY, {
    expiresIn: MAX_AGE,
  });
};
