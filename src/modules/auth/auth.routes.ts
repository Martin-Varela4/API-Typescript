import { Router } from "express";
import { z } from "zod";
import * as authController from "./auth.controller.js";
import { validateBody } from "../../middlewares/validate.middleware.js";
import { requireAuth } from "../../middlewares/auth.middleware.js";

const router = Router();

const loginSchema = z.object({
  email: z.string("El correo electrónico es obligatorio").trim().toLowerCase().min(1, "El correo electrónico es obligatorio"),
  password: z.string("La contraseña es obligatoria").min(1, "La contraseña es obligatoria"),
});

router.post("/login", validateBody(loginSchema), authController.login); // público
router.get("/me", requireAuth, authController.me); // requiere token

export default router;
