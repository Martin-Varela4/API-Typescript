import express from "express";
import cors from "cors";
import { env } from "./config/env.js";
import apiRoutes from "./routes.js";
import { errorHandler, notFoundHandler } from "./middlewares/error.middleware.js";

// Solo arma la aplicación Express (sin abrir puertos ni conectar a la BD),
// lo que permite reutilizarla en pruebas.
export const app = express();

app.disable("x-powered-by");
app.use(
  cors({
    origin: env.corsOrigins,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);
app.use(express.json({ limit: "100kb" }));

app.use("/api", apiRoutes);

app.use(notFoundHandler);
app.use(errorHandler);
