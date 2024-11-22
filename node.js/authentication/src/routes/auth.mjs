import { Router } from "express";
import authController from "../controllers/auth.mjs";
import { authorize } from "../middlewares/auth.mjs";

const router = Router();

router.post("/login", authController.login);
router.post("/register", authController.register);
router.get("/current-user", authorize(), authController.currentUser);
router.post("/logout", authController.logout);

export default router;
