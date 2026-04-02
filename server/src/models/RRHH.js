import { pool } from "../database/db.js";


//metodos que se conectan a la base de datos para las consultas y cambios que puede hacer un RRHH 
//se creo una clase para faciliatr el uso en otros archivos 



export class RRHH_METODOS {


//metodo que muestra todas las solicitudes pendientes 
    static async SolicitudesPendientes(){
    const [result] = await pool.query(
    `SELECT 
    SP.TN_SOL_ID,
    SP.TC_SOL_MOTIVO,
    SP.TF_SOL_FECHA_INICIO,
    SP.TF_SOL_FECHA_FIN,
    ES.TC_EST_NOMBRE        AS ESTADO,
    U.TN_USU_ID,
    U.TC_USU_NOMBRE,
    U.TC_USU_APELLIDOS,
    U.TC_USU_CORREO,
    D.TC_DEP_NOMBRE         AS DEPARTAMENTO

    FROM TBSGP_H_SOLICITUD_PERMISO SP
    INNER JOIN TBSGP_A_ESTADO_SOLICITUD ES  ON SP.TN_EST_ID  = ES.TN_EST_ID
    INNER JOIN TBSGP_A_USUARIO          U   ON SP.TN_USU_ID  = U.TN_USU_ID
    INNER JOIN TBSGP_A_DEPARTAMENTO     D   ON U.TN_DEP_ID   = D.TN_DEP_ID
    WHERE UPPER(ES.TC_EST_NOMBRE) = 'PENDIENTE'
    ORDER BY SP.TF_SOL_FECHA_INICIO ASC;`
  );
  return result;
    }

//metodo que permite actualizar el estado de un permiso (aceptar o rechazar) 
static async AceptarORechazarSolicitud(solicitudId, nuevoEstadoId) {
    const [result] = await pool.query(
        `UPDATE TBSGP_H_SOLICITUD_PERMISO
        SET TN_EST_ID = ?
        WHERE TN_SOL_ID = ?`,
        [nuevoEstadoId, solicitudId]
    );
    return result;
}


//metodo que muestra todas las solicitudes de un empleado en especifico (recibe el ID de dicho usuario)
static async SolicitudesEmpleado(usuarioId) {
    const [result] = await pool.query(
        `SELECT 
            SP.TN_SOL_ID,
            SP.TC_SOL_MOTIVO,
            SP.TF_SOL_FECHA_INICIO,
            SP.TF_SOL_FECHA_FIN,
            ES.TC_EST_NOMBRE        AS ESTADO,
            ES.TC_EST_DESCRIPCION   AS ESTADO_DESCRIPCION,
            U.TN_USU_ID,
            U.TC_USU_NOMBRE,
            U.TC_USU_APELLIDOS,
            U.TC_USU_CORREO
        FROM TBSGP_H_SOLICITUD_PERMISO SP
        INNER JOIN TBSGP_A_ESTADO_SOLICITUD ES  ON SP.TN_EST_ID = ES.TN_EST_ID
        INNER JOIN TBSGP_A_USUARIO          U   ON SP.TN_USU_ID = U.TN_USU_ID
        WHERE SP.TN_USU_ID = ?
        ORDER BY SP.TF_SOL_FECHA_INICIO DESC`,
        [usuarioId]
    );
    return result;
}


//metodo que muestra todos los colaboradores por departamento (recibe el id de el departamento que se desea filtrar)
static async ColaboradoresDep(departamentoId) {
    const [result] = await pool.query(
        `SELECT 
            U.TN_USU_ID,
            U.TC_USU_NOMBRE,
            U.TC_USU_APELLIDOS,
            U.TC_USU_IDENTIFICACION,
            U.TC_USU_CORREO,
            U.TF_USU_FECHA_NACIMIENTO,
            R.TC_ROL_NOMBRE         AS ROL,
            D.TN_DEP_ID,
            D.TC_DEP_NOMBRE         AS DEPARTAMENTO,
            D.TC_DEP_DESCRIPCION    AS DEPARTAMENTO_DESCRIPCION
        FROM TBSGP_A_USUARIO            U
        INNER JOIN TBSGP_A_DEPARTAMENTO D   ON U.TN_DEP_ID = D.TN_DEP_ID
        INNER JOIN TBSGP_A_ROL          R   ON U.TN_ROL_ID = R.TN_ROL_ID
        WHERE U.TN_DEP_ID = ?
        ORDER BY U.TC_USU_APELLIDOS ASC`,
        [departamentoId]
    );
    return result;
}
}
