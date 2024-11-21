const { Router } = require("express");

const {
  createNftValidationSchema,
  editNftValidationSchema,
} = require("../validation/nfts");
const controller = require("../controllers/nfts");
const validate = require("../middlewares/validator");
const upload = require("../middlewares/multer");

const router = Router();

router.get("/", controller.getAll);

router.post(
  "/",
  upload.single("image"),
  validate(createNftValidationSchema),
  controller.create
);

router.put(
  "/:id",
  upload.single("image"),
  validate(editNftValidationSchema),
  controller.update
);

router.delete("/:id", controller.remove);

module.exports = router;
