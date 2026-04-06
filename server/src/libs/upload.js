// Configuración de multer para recibir archivos de incapacidad.
// Los archivos se guardan en la carpeta server/uploads/
// con un nombre único para evitar colisiones.
//
// Formatos aceptados: PDF, JPG, PNG
// Tamaño máximo: 5MB

import multer from "multer";
import path from "path";
import fs from "fs";

// Crear la carpeta uploads/ si no existe
const uploadDir = "uploads";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    // Nombre único: timestamp + nombre original
    const uniqueName = `${Date.now()}-${file.originalname.replace(/\s/g, "_")}`;
    cb(null, uniqueName);
  },
});

// Filtro — solo acepta PDF, JPG, PNG
const fileFilter = (req, file, cb) => {
  const tiposPermitidos = ["image/jpeg", "image/png", "application/pdf"];
  if (tiposPermitidos.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Solo se permiten archivos PDF, JPG o PNG"), false);
  }
};

export const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB máximo
});