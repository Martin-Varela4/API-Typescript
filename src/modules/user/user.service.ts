import bcrypt from "bcrypt";
import * as userRepository from "./user.repository.js";

// Mantener los tipos de entrada nativos si usás TypeScript
export type RegisterInput = { nombre: string; email: string; password: string };

const emailDuplicado = () =>
  Object.assign(new Error("Ya existe un usuario con ese correo electrónico"), { status: 409 });

export const register = async ({ nombre, email, password }: RegisterInput) => {
  if (await userRepository.findByEmail(email)) throw emailDuplicado();

  const passwordHash = await bcrypt.hash(password, 10);
  try {
    const user = await userRepository.createUser({ nombre, email, passwordHash });

    // ❌ Eliminamos: return toPublicUser(user);
    // ✅ Cambiamos por: Desestructuración nativa para remover el passwordHash
    const { passwordHash: _, ...publicUser } = user as any;
    return publicUser;

  } catch (error: any) {
    if (error?.code === "ER_DUP_ENTRY" || error?.driverError?.code === "ER_DUP_ENTRY") throw emailDuplicado();
    throw error;
  }
};

export const listUsers = async () => {
  const users = await userRepository.findAll();

  // ❌ Eliminamos: return users.map(toPublicUser);
  // ✅ Cambiamos por: Mapeamos el array limpiando el passwordHash de cada usuario
  return users.map((user: any) => {
    const { passwordHash: _, ...publicUser } = user;
    return publicUser;
  });
};
