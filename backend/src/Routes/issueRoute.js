const express = require("express");
const router = express.Router();
const upload = require("./../Middlewares/uploadMiddleware");
const { createIssue } = require("../controllers/issueController");
const getIssues = require("./../Controllers/getIssue");
const voteRoutes = require("./votes");
router.post(
  "/create",
  upload.fields([
    { name: "images", maxCount: 3 },
    { name: "audio", maxCount: 1 },
  ]),
  createIssue
);
router.get("/get", getIssues);

router.use("/", voteRoutes);

module.exports = router;
