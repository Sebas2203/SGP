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


// ─── INCAPACIDAD — ahora recibe archivo via multer ────────────────────────────
// multer guarda el archivo y pone su info en req.file
// Los demás campos llegan en req.body como siempre
export const addMedicalLeave = async (req, res) => {
  try {
    const { status, userId, reason, startDate, endDate } = req.body;
 
    if (!status || !userId || !reason || !startDate || !endDate) {
      return res.status(400).json({ error: "Todos los campos son requeridos" });
    }
 
    // Si se subió un archivo, construimos la URL para accederlo
    // El front podrá acceder al archivo en: GET /uploads/nombre-del-archivo
    const archivoUrl = req.file
      ? `/uploads/${req.file.filename}`
      : null;
 
    const result = await LeaveModel.createMedicalLeave(
      status, userId, reason, startDate, endDate, archivoUrl
    );
 
    return res.status(201).json({
      message: "Permiso médico solicitado exitosamente",
      id: result.insertId,
      archivoUrl, // devolvemos la URL para que el front la pueda usar
    });
  } catch (error) {
    if (!res.headersSent) {
      return res.status(500).json({ error: error.message });
    }
  }
};