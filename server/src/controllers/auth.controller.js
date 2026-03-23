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
