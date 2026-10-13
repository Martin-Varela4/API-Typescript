import "reflect-metadata";
import { DataSource } from "typeorm";
import { env } from "./env.js";
import { User } from "../modules/user/user.entity.js";
// TODO (cuando existan): importar acá las nuevas entidades, por ejemplo
// import { Product } from "../modules/product/product.entity.js";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: env.db.host,
  port: env.db.port,
  username: env.db.user,
  password: env.db.password,
  database: env.db.name,
  synchronize: env.db.synchronize,
  // Registrar cada entidad nueva en este array
  entities: [User],
});
