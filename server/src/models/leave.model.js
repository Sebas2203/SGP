import { pool } from "../database/db.js";

//empleados pueden pedir vacaciones y permisos

//pedir vacaciones e incapacidades medicas

export class LeaveModel {
  //metodo para crear una solicitud de vacaciones o permiso (el query es identico)
  static async createLeave(status, userId, reason, startDate, endDate) {
    const [result] = await pool.query(
      `INSERT INTO TBSGP_H_SOLICITUD_PERMISO 
                (TN_EST_ID, TN_USU_ID, TC_SOL_MOTIVO, TF_SOL_FECHA_INICIO, TF_SOL_FECHA_FIN) 
             VALUES (?, ?, ?, ?, ?)`,
      [status, userId, reason, startDate, endDate],
    );
    return result;
  }

 // Método nuevo para incapacidades — igual pero guarda también la URL del archivo
  static async createMedicalLeave(status, userId, reason, startDate, endDate, archivoUrl) {
    const [result] = await pool.query(
      `INSERT INTO TBSGP_H_SOLICITUD_PERMISO 
        (TN_EST_ID, TN_USU_ID, TC_SOL_MOTIVO, TF_SOL_FECHA_INICIO, TF_SOL_FECHA_FIN, TC_ARCHIVO_URL) 
       VALUES (?, ?, ?, ?, ?, ?)`,
      [status, userId, reason, startDate, endDate, archivoUrl],
    );
    return result;
  }
}