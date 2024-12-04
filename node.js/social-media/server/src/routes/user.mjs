import { Router } from "express";
import userController from "../controllers/user.mjs";
import { authorize } from "../middlewares/auth.mjs";
import { upload } from "../middlewares/upload.mjs";
import validateSchema from "../middlewares/validate.mjs";
import { updateUserSchema } from "../validation/user.mjs";

const router = Router();

router.patch(
  "/",
  authorize(),
  upload.single("image"),
  validateSchema(updateUserSchema),
  userController.update
);

export default router;
