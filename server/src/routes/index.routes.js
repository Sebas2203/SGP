import { Router } from "express";
import { pingPong } from "../controllers/index.controller.js";

const router = Router();

router.get("/ping", pingPong);

export default router;
