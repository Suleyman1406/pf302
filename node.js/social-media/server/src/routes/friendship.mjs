import { Router } from "express";
import { authorize } from "../middlewares/auth.mjs";

const router = Router();

import inviteController from "../controllers/friendship.mjs";
import validateSchema from "../middlewares/validate.mjs";
import { followRequestSchema } from "../validation/friendship.mjs";

router.get("/getAll", authorize(), inviteController.getAllRequests);
router.post(
  "/:recipientId/send",
  authorize(),
  validateSchema(followRequestSchema),
  inviteController.sendRequest
);
router.patch("/:requestId/accept", authorize(), inviteController.acceptRequest);
router.patch("/:requestId/reject", authorize(), inviteController.rejectRequest);
router.delete("/:userId/unfollow", authorize(), inviteController.removeFriend);
router.delete("/:userId/retract", authorize(), inviteController.retractRequest);

export default router;
