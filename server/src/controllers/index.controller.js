import { pool } from "../db/db.js";

//para ver si funciona la base de datos
export const pingPong = async (req, res) => {
  try {
    // const [result] = await pool.query("SELECT 'Pong' AS RESULT");
    // res.json(result[0]);
    const result = await pool.query("SELECT * FROM TBSGP_A_ROL;");
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
