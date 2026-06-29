(`src/modules/user/user.controller.ts`)


import { Request, Response } from "express";
import * as userService from "./user.service.js";

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await userService.register(email, password);
    res.status(201).json(user);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};