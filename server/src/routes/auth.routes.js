import { Router } from "express";
import { register, login } from "../controllers/auth.controller.js";

const router = Router();

router.post("/register", register);

//ruta que sirve para validar el login
router.post("/login", login);

export default router;
