import { AppDataSource } from "../../config/data-source.js";
import { User } from "./user.entity.js";

const userRepo = () => AppDataSource.getRepository(User);

export const findByEmail = (email: string) => userRepo().findOneBy({ email });

export const findById = (id: number) => userRepo().findOneBy({ id });

export const findAll = () => userRepo().find({ order: { id: "ASC" } });

export const createUser = (data: Pick<User, "nombre" | "email" | "passwordHash">) =>
  userRepo().save(userRepo().create(data));
