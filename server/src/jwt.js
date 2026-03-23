//Generacion de las tokens para el manejo de las sesiones 

import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();



//funcion que va a generar un token para el acceso y la sesion de un usuar
export const generarToken = (user) => {
  return jwt.sign(
    //en base al usuario se genra el token
    {  usuario: user.TC_USU_NOMBRE },
    //firma de el token (misma para todos)
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
};

//esta funcion se asegura que exista un token 
export function ensureToken(req, res, next){
    const bearerHeader = req.headers["authorization"];
    console.log(bearerHeader)

    if (typeof bearerHeader !== "undefined"){
        const bearer = bearerHeader.split(" ")
        const bearerToken = bearer[1]
        req.token = bearerToken
            next();
    }
    else{
        res.sendStatus(403);
    }
}