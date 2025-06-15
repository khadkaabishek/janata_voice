const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

const handleKYC = require("../Controllers/kycController");

// Multer storage config to save files in public/uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) =>
    cb(null, path.join(__dirname, "../../public/uploads")),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});

const upload = multer({ storage });

router.post("/", upload.single("nidCard"), handleKYC);
module.exports = router;
