import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { env } from "../../config/env.js";
import { findByEmail } from "../user/user.repository.js";
import { toPublicUser } from "../user/user.dto.js";

export type LoginInput = { email: string; password: string };

export const login = async ({ email, password }: LoginInput) => {
  const user = await findByEmail(email);

  // Mismo mensaje si el correo no existe o la contraseña es incorrecta
  const passwordOk = user ? await bcrypt.compare(password, user.passwordHash) : false;
  if (!user || !passwordOk) {
    throw Object.assign(new Error("Correo o contraseña incorrectos"), { status: 401 });
  }

  const token = jwt.sign({ email: user.email }, env.jwt.secret, {
    subject: String(user.id),
    expiresIn: env.jwt.expiresIn as jwt.SignOptions["expiresIn"],
  });

  return { token, user: toPublicUser(user) };
};

// Devuelve el id del usuario si el token es válido; si no, lanza un error 401
export const verifyToken = (token: string): number => {
  try {
    const payload = jwt.verify(token, env.jwt.secret);
    return Number(typeof payload === "object" ? payload.sub : NaN);
  } catch {
    throw Object.assign(new Error("Token inválido o expirado"), { status: 401 });
  }
};
