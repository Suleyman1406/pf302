import { Router } from "express";
import { authorize } from "../middlewares/auth";
import rentController from "../controllers/rent";
import validateSchema from "../middlewares/validate";
import { createRentSchema, editRentSchema, getAllRentsSchema } from "../validation/rent";
import { upload } from "../middlewares/upload";

const router = Router();

router.get("/", validateSchema(getAllRentsSchema), rentController.getAll);
router.get("/:id", rentController.getById); 
router.post(
  "/",
  authorize({ isAdmin: true }),
  upload.array("images", 10),
  validateSchema(createRentSchema),
  rentController.create
);
router.put(
  "/:id",
  authorize({ isAdmin: true }),
  upload.array("images", 10),
  validateSchema(editRentSchema),
  rentController.edit
);
router.delete("/:id", authorize({ isAdmin: true }), rentController.remove);

export default router;
