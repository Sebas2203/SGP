//creacion de las rutas para las consultas de el dashboard
import { Router } from "express";
import { getSolicitudesPorDepartamento, getSolicitudesPorEstado, getSolicitudesPorMes, getUsuariosPorDepartamento } from "../controllers/dashboard.controller.js";

const router = Router();

router.get("/solicitudesEstado", getSolicitudesPorEstado);
router.get("/solicitudesDepartamento",  getSolicitudesPorDepartamento);
router.get("/solicitudesMes",  getSolicitudesPorMes);
router.get("/usuariosDepartamento", getUsuariosPorDepartamento);


export default router;
