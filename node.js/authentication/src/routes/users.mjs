import { Router } from "express";
import { authorize } from "../middlewares/auth.mjs";
import userController from "../controllers/users.mjs";

const router = Router();

router.get("/", authorize({ isAdmin: true }), userController.getAll);
router.post(
  "/:id/block",
  authorize({ isAdmin: true }),
  userController.blockUser
);
router.post(
  "/:id/unblock",
  authorize({ isAdmin: true }),
  userController.unblockUser
);

export default router;
