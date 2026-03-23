import { Router } from "express";
import { mensajeProtegido } from "../controllers/protegida.controller.js";
import { ensureToken } from "../libs/jwt.js";

const router = Router();

router.get("/protected", ensureToken, mensajeProtegido )

export default router