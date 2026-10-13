import type { NextFunction, Request, Response } from "express";
import * as userService from "./user.service.js";

export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await userService.register(req.body);
    res.status(201).json({ data: user });
  } catch (error) {
    next(error);
  }
};

export const list = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await userService.listUsers();
    res.status(200).json({ data: users, meta: { total: users.length } });
  } catch (error) {
    next(error);
  }
};
