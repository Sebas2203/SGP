
import { pool } from "../database/db.js";

import bcrypt from "bcryptjs";
import { crearToken } from "../libs/jwt.js";
import {
  findByCorreoOIdentificacion,
  crearUsuario,
} from "../models/usuario.model.js";

//metodo que valida un usuario en la base de datos 


export const login = async (req, res) => {
  try {
    const { correo, password } = req.body;

    // Validar campos
    if (!correo || !password) {
      return res.status(400).json({
        message: "Correo y contraseña requeridos"
      });
    }

    // Buscar usuario por correo
    const [rows] = await pool.query(
      "SELECT * FROM TBSGP_A_USUARIO WHERE TC_USU_CORREO = ?",
      [correo]
    );

    // Verificar si existe
    if (rows.length === 0) {
      return res.status(404).json({
        message: "Usuario no existe"
      });
    }

    const user = rows[0];

    //Comparar contraseña encriptada
    const passwordValida = await bcrypt.compare(
      password,
      user.TC_USU_PASSWORD
    );

    if (!passwordValida) {
      return res.status(401).json({
        message: "Contraseña incorrecta"
      });
    }

    //Login exitoso
    res.json({
      message: "Login exitoso",
      user: user.TC_USU_NOMBRE,
      token: crearToken(user)
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



//registrar usuario en la db 

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

