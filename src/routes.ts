import { Router } from "express";
import authRoutes from "./modules/auth/auth.routes.js";
import userRoutes from "./modules/user/user.routes.js";
// TODO (cuando existan): import productRoutes from "./modules/product/product.routes.js";

const router = Router();

router.get("/health", (_req, res) => {
  res.status(200).json({ data: { status: "ok" } });
});

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
// TODO: router.use("/products", productRoutes);
// TODO: router.use("/carts", cartRoutes);

export default router;
