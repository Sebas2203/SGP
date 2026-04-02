import { Router } from "express";
import { employeeID, leaveID } from "../controllers/employee.controller.js";

const router = Router();

//rutas para poder pedir vacaciones y para permisos
router.get("/employee/:id", employeeID);
router.get("/employeeLeave/:id", leaveID);

export default router;
