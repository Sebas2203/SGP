import { Router } from "express";
import {
  addVacation,
  addMedicalLeave,
} from "../controllers/leave.controller.js";

const router = Router();

//rutas para poder pedir vacaciones y para permisos
router.post("/addVacations", addVacation);
router.post("/addMedicalLeave", addMedicalLeave);

export default router;
