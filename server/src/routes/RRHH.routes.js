import { Router } from "express";
import { SolicitudController } from "../controllers/RRHH.controller.js";

const router = Router();

router.get("/getSolicitudes",SolicitudController.getSolicitudesPendientes );
router.put("/putEstado", SolicitudController.putAceptarORechazarSolicitud );
router.get("/getSolicitudesEmpleado", SolicitudController.getSolicitudesEmpleado);
router.get("/getEmpleadosDepartamento", SolicitudController.getColaboradoresDep );



export default router;
