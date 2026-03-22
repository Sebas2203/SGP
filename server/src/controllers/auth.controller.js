import { pool } from "../database/db.js";



export const register = (req, res) => {
  const { email, password, username } = req.body;
  res.send("registrando");
};


//export const login = (req, res) => {
//  res.send("login");
//};


//prueba de un login 

//export const login = async (req, res) => {
//  try {
//    const result = await pool.query("SELECT (TC_ROL_NOMBRE) FROM TBSGP_A_ROL;");
//    res.json(result);
//  } catch (error) {
//    res.status(500).json({ message: error.message });
//  }
//};





export const login = async (req, res) => {
  try {
    const { usuario, password } = req.body;
    

    //validar que vengan datos
    if(!usuario || !password){
      return res.status(400).json({
        message : "usuario y contraseña requeridos"
      })
    }

    //Buscar usuario en la BD
    const [rows] = await pool.query(
      "SELECT * FROM TBSGP_A_USUARIO WHERE TC_USU_NOMBRE = ?",
      [usuario]
    );

    // Verificar si existe
    if (rows.length === 0) {
      return res.status(404).json({ message: "Usuario no existe" });
    }

        const user = rows[0];

    //Validar contraseña (PLANO - solo para pruebas)
    if (user.TC_USU_PASSWORD !== password) {
      return res.status(401).json({
         message: "Contraseña incorrecta",
        pass : password
        
        });
    }

        // 5. Login exitoso
    res.json({
      message: "Login exitoso",
      user: user.TC_USU_NOMBRE
    });




  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};