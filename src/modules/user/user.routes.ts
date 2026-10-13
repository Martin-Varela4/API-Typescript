import { Router } from "express";
import { z } from "zod";
import * as userController from "./user.controller.js";
import { validateBody } from "../../middlewares/validate.middleware.js";
import { requireAuth } from "../../middlewares/auth.middleware.js";

const router = Router();

const registerSchema = z.object({
  nombre: z.string("El nombre es obligatorio").trim().min(2, "El nombre debe tener al menos 2 caracteres").max(100, "El nombre no puede superar los 100 caracteres"),
  email: z.string("El correo electrónico es obligatorio").trim().toLowerCase().email("El correo electrónico no es válido"),
  // bcrypt solo usa los primeros 72 bytes de la contraseña
  password: z.string("La contraseña es obligatoria").min(8, "La contraseña debe tener al menos 8 caracteres").max(72, "La contraseña no puede superar los 72 caracteres"),
});

router.post("/register", validateBody(registerSchema), userController.register); // público
router.get("/", requireAuth, userController.list); // requiere token

export default router;
