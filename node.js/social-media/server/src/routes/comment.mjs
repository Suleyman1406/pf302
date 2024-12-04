import { Router } from "express";
import commentController from "../controllers/comment.mjs";
import { authorize } from "../middlewares/auth.mjs";
import validateSchema from "../middlewares/validate.mjs";
import { commentSchema } from "../validation/comment.mjs";

const router = Router();

router.get("/:postId", authorize(), commentController.getAll);
router.post(
  "/:postId",
  authorize(),
  validateSchema(commentSchema),
  commentController.create
);
router.put(
  "/:id",
  authorize(),
  validateSchema(commentSchema),
  commentController.update
);
router.delete("/:id", authorize(), commentController.remove);

export default router;
