import type { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";

// Ruta que no existe
export const notFoundHandler = (_req: Request, res: Response) => {
  res.status(404).json({ message: "Ruta no encontrada" });
};

// Middleware global de errores (se registra al FINAL de la app).
// Formato de respuesta: { message, errors? }
export const errorHandler = (err: any, _req: Request, res: Response, _next: NextFunction) => {
  // Error de validación de Zod -> 400 con los mensajes por campo
  if (err instanceof ZodError) {
    return res.status(400).json({
      message: "Datos inválidos",
      errors: err.issues.map((issue) => ({
        campo: issue.path.join("."),
        mensaje: issue.message,
      })),
    });
  }

  // Si el error trae "status" se usa ese número; si no, es un error inesperado (500)
  const status: number = err.status ?? 500;

  if (status === 500) {
    console.error(err); // se registra en el servidor, no se muestra al cliente
    return res.status(500).json({ message: "Error interno del servidor" });
  }

  res.status(status).json({ message: err.message });
};
