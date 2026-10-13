// Carga y valida las variables de entorno UNA sola vez.
// Cualquier módulo que necesite configuración debe importar `env` desde acá,
// así dotenv ya está cargado sin importar el orden de los imports.
import "dotenv/config";

const isProduction = process.env.NODE_ENV === "production";

function required(name: string): string {
  const value = process.env[name];
  if (value === undefined || value.trim() === "") {
    throw new Error(`Falta la variable de entorno obligatoria ${name} (revisá tu archivo .env)`);
  }
  return value;
}

function toPort(name: string, fallback?: number): number {
  const raw = process.env[name];
  if ((raw === undefined || raw === "") && fallback !== undefined) return fallback;
  const port = Number(raw);
  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    throw new Error(`La variable ${name} debe ser un puerto válido (1-65535)`);
  }
  return port;
}

const jwtSecret = required("SECRET_KEY");
if (jwtSecret.length < 32) {
  const msg = "SECRET_KEY es corta: usá al menos 32 caracteres aleatorios";
  if (isProduction) throw new Error(msg);
  console.warn(`[config] Aviso: ${msg}`);
}

export const env = {
  nodeEnv: process.env.NODE_ENV ?? "development",
  isProduction,
  port: toPort("PORT", 8080),
  db: {
    host: required("DB_HOST"),
    port: toPort("DB_PORT"),
    user: required("DB_USER"),
    // La contraseña puede ser vacía (por ejemplo, MySQL local sin clave)
    password: process.env.DB_PASS ?? "",
    name: required("DB_NAME"),
    // En producción conviene usar migraciones en lugar de synchronize
    synchronize: process.env.DB_SYNC !== undefined ? process.env.DB_SYNC === "true" : !isProduction,
  },
  jwt: {
    secret: jwtSecret,
    expiresIn: process.env.JWT_EXPIRES_IN ?? "1h",
  },
  corsOrigins: (process.env.CORS_ORIGIN ?? "http://localhost:5173,http://127.0.0.1:5173")
    .split(",")
    .map((o) => o.trim())
    .filter(Boolean),
} as const;
