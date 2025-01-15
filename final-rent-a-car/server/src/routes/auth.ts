import { Router } from "express";
import authController from "../controllers/auth";
import { authenticate, authorize } from "../middlewares/auth";

const router = Router();

router.post("/login", authenticate, authController.login);
router.post("/register", authController.register);
router.get("/current-user", authorize(), authController.currentUser);
router.post("/logout", authController.logout);
router.post("/forgot-password", authController.forgotPassword);
router.post("/reset-password", authController.resetPassword);

export default router;
