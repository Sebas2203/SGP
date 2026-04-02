import express from "express";
import morgan from "morgan";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import indexRoutes from "./routes/index.routes.js";
import leave from "./routes/leave.routes.js";
import RRHH from "./routes/RRHH.routes.js"
import dashboard from "./routes/dashboard.routes.js"

//ruta de prueba
//import protegidaRoutes from "./routes/protegida.routes.js";

const app = express();

//middleware
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

//routes
app.use("/api", indexRoutes);
app.use("/api", authRoutes);
app.use("/api", leave);
app.use("/api", dashboard);





app.use("/api", RRHH);
//esta ruta la use de pruebas para los tokens
//app.use("/api", protegidaRoutes);

//route not found
app.use((req, res, next) => {
  res.status(404).json({
    message: "Endpoint Not Found",
  });
});

export default app;
