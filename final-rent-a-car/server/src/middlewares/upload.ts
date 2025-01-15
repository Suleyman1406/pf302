import { v4 as uuidv4 } from "uuid";
import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/rent/");
  },
  filename: function (req, file, cb) {
    const fileExtension = file.originalname.split(".").pop();
    const uniqueSuffix = uuidv4() + "." + fileExtension;
    const fileName = "rent-" + uniqueSuffix;
    cb(null, fileName);
  },
});

export const upload = multer({ storage: storage });
