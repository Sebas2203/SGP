
import { pool } from "../database/db.js";
import { generarToken } from "../jwt.js"; 

//metodo que valida un usuario en la base de datos 
export const login = async (req, res) => {
  try {
    const { usuario, password } = req.body;
    

    //validar que los campos no vienen vacios 
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

    // Verifica si existe el usuario en la base de datos
    if (rows.length === 0) {
      return res.status(404).json({ message: "Usuario no existe" });
    }

        const user = rows[0];

    //Validar contraseña (solo pruebas por el momento, ya que no se encriptan)
    if (user.TC_USU_PASSWORD !== password) {
      return res.status(401).json({

        message: "Contraseña incorrecta",
        
        });
    }
        //login exitoso, regresa un token para el acceso de el usuario
      
    res.json({
      message: "Login exitoso",
      user: user.TC_USU_NOMBRE,

      //llama la funcion que genera los token y los devuelve para que lo guarde el usuario
      token: generarToken(user)
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }

import bcrypt from "bcryptjs";
import { crearToken } from "../libs/jwt.js";
import {
  findByCorreoOIdentificacion,
  crearUsuario,
} from "../models/usuario.model.js";

export const register = async (req, res) => {
  const {
    nombre,
    apellidos,
    identificacion,
    correo,
    password,
    fechaNacimiento,
    depId,
  } = req.body;

  // Validar campos
  if (
    !nombre ||
    !apellidos ||
    !identificacion ||
    !correo ||
    !password ||
    !fechaNacimiento ||
    !depId
  ) {
    return res
      .status(400)
      .json({ message: "Todos los campos son requeridos." });
  }

  // Verificar si ya existe
  const usuarioExistente = await findByCorreoOIdentificacion(
    correo,
    identificacion,
  );
  if (usuarioExistente) {
    return res
      .status(409)
      .json({ message: "El correo o identificación ya están registrados." });
  }

  // Encriptar contraseña
  const passwordEncriptada = await bcrypt.hash(password, 10);

  // Crear usuario en DB
  const nuevoId = await crearUsuario(
    depId,
    nombre,
    apellidos,
    identificacion,
    correo,
    passwordEncriptada,
    fechaNacimiento,
  );

  // Crear token
  const token = crearToken({ id: nuevoId, correo });

  res.status(201).json({
    message: "Usuario registrado exitosamente.",
    token,
  });
};

export const login = (req, res) => {
  res.send("login");

};
