import type { NextFunction, Request, Response } from "express";
import type { ZodType } from "zod";

// Valida req.body con un esquema de Zod. Si es válido, reemplaza req.body por
// los datos ya limpios (con trim, minúsculas, sin campos extra). Si no, pasa el
// error al manejador global con next(error).
export const validateBody = (schema: ZodType) => (req: Request, _res: Response, next: NextFunction) => {
  try {
    req.body = schema.parse(req.body);
    next();
  } catch (error) {
    next(error);
  }
};
