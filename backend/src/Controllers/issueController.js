const path = require("path");
const Issue = require("../Models/issue");

const createIssue = async (req, res) => {
  console.log(req.body);

  try {
    const {
      title,
      description,
      category,
      location,
      ward,
      isAnonymous,
      latitude,
      longitude,
    } = req.body;

    // ✅ Save only the public-facing relative paths for images
    const imagePaths =
      req.files?.images?.map((file) => `/uploads/${file.filename}`) || [];

    // ✅ Save only the public-facing path for audio (if any)
    const audioPath = req.files?.audio?.[0]
      ? `/uploads/${req.files.audio[0].filename}`
      : null;

    // ✅ Require at least one image
    if (imagePaths.length === 0) {
      return res
        .status(400)
        .json({ message: "At least one image is required." });
    }

    const newIssue = new Issue({
      title,
      description,
      category,
      location,
      ward: `ward${ward}`,
      isAnonymous: isAnonymous === "true",
      images: imagePaths,
      audio: audioPath,
      latitude,
      longitude,
      status: "pending",
    });

    await newIssue.save();

    res
      .status(201)
      .json({ message: "Issue created successfully", issue: newIssue });
  } catch (error) {
    console.error("Error creating issue:", error);
    res
      .status(500)
      .json({ message: "Failed to create issue", error: error.message });
  }
};

module.exports = { createIssue };
