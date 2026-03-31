
import {
  solicitudesPorEstado,
  solicitudesPorMes,
  solicitudesPorDepartamento,
  usuariosPorDepartamento
} from "../models/dashboard.js";

export const getSolicitudesPorEstado = async (req, res) => {
  try {
    const data = await solicitudesPorEstado();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getSolicitudesPorMes = async (req, res) => {
  try {
    const data = await solicitudesPorMes();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getSolicitudesPorDepartamento = async (req, res) => {
  try {
    const data = await solicitudesPorDepartamento();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUsuariosPorDepartamento = async (req, res) => {
  try {
    const data = await usuariosPorDepartamento();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};