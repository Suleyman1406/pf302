import { Router } from "express";
import { authorize } from "../middlewares/auth";
import reviewController from "../controllers/review";
import validateSchema from "../middlewares/validate";
import {
  ChangeReviewStatusSchema,
  createReviewSchema,
} from "../validation/review";

const router = Router();

router.get("/", authorize({ isAdmin: true }), reviewController.getAll);
router.get("/:rentId", reviewController.getByRentId);
router.post(
  "/",
  authorize({}),
  validateSchema(createReviewSchema),
  reviewController.create
);
router.put(
  "/change-status/:id",
  authorize({ isAdmin: true }),
  validateSchema(ChangeReviewStatusSchema),
  reviewController.changeStatus
);

export default router;
