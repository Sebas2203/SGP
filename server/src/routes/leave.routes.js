import { Router } from "express";
import {
  addVacation,
  addMedicalLeave,
} from "../controllers/leave.controller.js";
import { upload } from "../libs/upload.js";

const router = Router();

//rutas para poder pedir vacaciones y para permisos
router.post("/addVacations", addVacation);
// Incapacidades — ahora usa multer para recibir el archivo
// upload.single("archivo") significa que espera un campo llamado "archivo"
// que es exactamente el nombre que usa el front en el FormData
router.post("/addMedicalLeave", upload.single("archivo"), addMedicalLeave);

export default router;
