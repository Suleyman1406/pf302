import { Router } from "express";
import { authorize } from "../middlewares/auth";
import reservationController from "../controllers/reservation";
import {
  changeReservationStatusSchema,
  createReservationSchema,
} from "../validation/reservation";
import validateSchema from "../middlewares/validate";

const router = Router();

router.get("/", authorize({}), reservationController.getAll);
router.post(
  "/",
  authorize({}),
  validateSchema(createReservationSchema),
  reservationController.create
);
router.put(
  "/change-status/:id",
  authorize({}),
  validateSchema(changeReservationStatusSchema),
  reservationController.changeStatus
);
export default router;
