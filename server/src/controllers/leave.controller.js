import { LeaveModel } from "../models/leave.model.js";

const handleLeaveRequest = async (req, res, successMessage) => {
  const { status, userId, reason, startDate, endDate } = req.body;

  if (!status || !userId || !reason || !startDate || !endDate) {
    return res.status(400).json({ error: "Todos los campos son requeridos" });
  }

  const result = await LeaveModel.createLeave(
    status,
    userId,
    reason,
    startDate,
    endDate,
  );

  return res.status(201).json({
    message: successMessage,
    id: result.insertId,
  });
};

// Vacaciones
export const addVacation = async (req, res) => {
  try {
    await handleLeaveRequest(req, res, "Vacaciones solicitadas exitosamente");
  } catch (error) {
    // Verificá que no se haya mandado ya una respuesta
    if (!res.headersSent) {
      return res.status(500).json({ error: error.message });
    }
  }
};

// Permiso médico
export const addMedicalLeave = async (req, res) => {
  try {
    await handleLeaveRequest(
      req,
      res,
      "Permiso médico solicitado exitosamente",
    );
  } catch (error) {
    if (!res.headersSent) {
      return res.status(500).json({ error: error.message });
    }
  }
};
