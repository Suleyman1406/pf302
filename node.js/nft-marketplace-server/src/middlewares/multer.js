const multer = require("multer");
const { v4: uuidv4 } = require("uuid");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images/nfts");
  },
  filename: function (req, file, cb) {
    const fileExtension = file.originalname.split(".").pop();
    const fileName = `nft-${uuidv4()}.${fileExtension}`;
    cb(null, fileName);
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
