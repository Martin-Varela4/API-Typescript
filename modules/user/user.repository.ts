import { AppDataSource } from "../../database/data-source.js";
import { User } from "./user.entity.js";

const userRepo = () => AppDataSource.getRepository(User);

export const findByEmail = async (email: string) =>
  userRepo().findOneBy({ email });

export const createUser = async (data: Partial<User>) =>
  userRepo().save(userRepo().create(data));