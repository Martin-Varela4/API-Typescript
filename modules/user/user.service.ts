import bcrypt from "bcrypt";
import * as userRepository from "./user.repository.js";

export const register = async (email: string, password: string) => {
  const existing = await userRepository.findByEmail(email);
  if (existing) throw new Error("El usuario ya existe");

  const passwordHash = await bcrypt.hash(password, 10);
  return userRepository.createUser({ email, passwordHash });
}