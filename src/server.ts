import "reflect-metadata";
import { env } from "./config/env.js";
import { AppDataSource } from "./config/data-source.js";
import { app } from "./app.js";

async function main() {
  // La base de datos debe estar lista ANTES de aceptar solicitudes
  await AppDataSource.initialize();
  console.log(`Base de datos conectada (${env.db.host}:${env.db.port}/${env.db.name})`);

  const server = app.listen(env.port, () => {
    console.log(`API escuchando en http://localhost:${env.port}/api`);
  });

  const shutdown = async () => {
    server.close();
    if (AppDataSource.isInitialized) await AppDataSource.destroy();
    process.exit(0);
  };
  process.on("SIGINT", shutdown);
  process.on("SIGTERM", shutdown);
}

main().catch((err: Error) => {
  console.error("No se pudo iniciar el servidor:", err.message);
  process.exit(1);
});
