import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config.js";

export const crearToken = (payload) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "1d" });
};

export const verificarToken = (token) => {
  return jwt.verify(token, JWT_SECRET);
};
