import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config.js";

export const crearToken = (payload) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "1d" });
};

export const verificarToken = (token) => {
  return jwt.verify(token, JWT_SECRET);
};



//esta funcion se asegura que exista un token, se llama antes de entrar a una ruta siempre 
export function ensureToken(req, res, next){
    const bearerHeader = req.headers["authorization"];
    console.log(bearerHeader)

    if (typeof bearerHeader !== "undefined"){
        const bearer = bearerHeader.split(" ")
        const bearerToken = bearer[1]
        req.token = bearerToken
            next();
    }
    //en caso de que no haya token devuelve forbidden (no autorizado)
    else{
        res.sendStatus(403);
    }
}