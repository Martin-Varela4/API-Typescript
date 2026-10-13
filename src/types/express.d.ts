import type { PublicUser } from "../modules/user/user.dto.js";

declare global {
  namespace Express {
    interface Request {
      /** Usuario autenticado; lo completa el middleware requireAuth */
      authUser?: PublicUser;
    }
  }
}

export {};
