import express from "express";
import morgan from "morgan";
import authRoutes from "./routes/auth.routes.js";
import indexRoutes from "./routes/index.routes.js";

const app = express();

//middleware
app.use(morgan("dev"));
app.use(express.json());

//routes

app.use("/api", indexRoutes);
app.use("/api", authRoutes);

//route not found
app.use((req, res, next) => {
  res.status(404).json({
    message: "Endpoint Not Found",
  });
});

export default app;
