
import {RRHH_METODOS} from "../models/RRHH.js";

export class SolicitudController {

    // GET - Obtener todas las solicitudes pendientes
    static async getSolicitudesPendientes(req, res) {
        try {
            const solicitudes = await RRHH_METODOS.SolicitudesPendientes();

            if (solicitudes.length === 0) {
                return res.status(404).json({
                    success: false,
                    message: "No hay solicitudes pendientes"
                });
            }

            res.status(200).json({
                success: true,
                data: solicitudes
            });

        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Error al obtener las solicitudes pendientes",
                error: error.message
            });
        }
    }

    // PUT - Aceptar o rechazar una solicitud
    static async putAceptarORechazarSolicitud(req, res) {
        try {
            const { solicitudId, nuevoEstadoId } = req.body;

            if (!solicitudId || !nuevoEstadoId) {
                return res.status(400).json({
                    success: false,
                    message: "Los campos solicitudId y nuevoEstadoId son requeridos"
                });
            }

            const result = await RRHH_METODOS.AceptarORechazarSolicitud(solicitudId, nuevoEstadoId);

            if (result.affectedRows === 0) {
                return res.status(404).json({
                    success: false,
                    message: "Solicitud no encontrada"
                });
            }

            res.status(200).json({
                success: true,
                message: "Estado de la solicitud actualizado correctamente"
            });

        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Error al actualizar el estado de la solicitud",
                error: error.message
            });
        }
    }

    // GET - Obtener solicitudes por empleado
    static async getSolicitudesEmpleado(req, res) {
        try {
            const { usuarioId } = req.body;

            if (!usuarioId) {
                return res.status(400).json({
                    success: false,
                    message: "El campo usuarioId es requerido"
                });
            }

            const solicitudes = await RRHH_METODOS.SolicitudesEmpleado(usuarioId);

            if (solicitudes.length === 0) {
                return res.status(404).json({
                    success: false,
                    message: "No se encontraron solicitudes para este empleado"
                });
            }

            res.status(200).json({
                success: true,
                data: solicitudes
            });

        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Error al obtener las solicitudes del empleado",
                error: error.message
            });
        }
    }

    // GET - Obtener colaboradores por departamento
    static async getColaboradoresDep(req, res) {
        try {
            const { departamentoId } = req.body;

            if (!departamentoId) {
                return res.status(400).json({
                    success: false,
                    message: "El campo departamentoId es requerido"
                });
            }

            const colaboradores = await RRHH_METODOS.ColaboradoresDep(departamentoId);

            if (colaboradores.length === 0) {
                return res.status(404).json({
                    success: false,
                    message: "No se encontraron colaboradores para este departamento"
                });
            }

            res.status(200).json({
                success: true,
                data: colaboradores
            });

        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Error al obtener los colaboradores del departamento",
                error: error.message
            });
        }
    }
}