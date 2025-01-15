import { Router } from "express";
import { authorize } from "../middlewares/auth";
import categoryController from "../controllers/category";
import validateSchema from "../middlewares/validate";
import { createCategorySchema } from "../validation/category";

const router = Router();

router.get("/", categoryController.getAll);

router.post(
  "/",
  authorize({ isAdmin: true }),
  validateSchema(createCategorySchema),
  categoryController.create
);
router.delete("/:id", authorize({ isAdmin: true }), categoryController.remove);

export default router;
