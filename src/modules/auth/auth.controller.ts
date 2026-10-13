import type { NextFunction, Request, Response } from "express";
import * as authService from "./auth.service.js";

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await authService.login(req.body);
    res.status(200).json({ data: result });
  } catch (error) {
    next(error);
  }
};

// requireAuth ya cargó al usuario en req.authUser
export const me = (req: Request, res: Response) => {
  res.status(200).json({ data: req.authUser });
};
