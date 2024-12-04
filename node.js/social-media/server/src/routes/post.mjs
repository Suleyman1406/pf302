import { Router } from "express";
import postController from "../controllers/post.mjs";
import { authorize } from "../middlewares/auth.mjs";
import validateSchema from "../middlewares/validate.mjs";
import { postCreateSchema, postEditSchema } from "../validation/post.mjs";
import { upload } from "../middlewares/upload.mjs";

const router = Router();

router.get("/", authorize(), postController.getAll);
router.post(
  "/",
  authorize(),
  upload.single("image"),
  validateSchema(postCreateSchema),
  postController.create
);
router.put(
  "/:id",
  authorize(),
  upload.single("image"),
  validateSchema(postEditSchema),
  postController.update
);
router.delete("/:id", authorize(), postController.remove);
router.put("/:id/like", authorize(), postController.like);

export default router;
