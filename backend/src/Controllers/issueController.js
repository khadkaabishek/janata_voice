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

    const imagePaths = req.files?.images?.map((file) => file.path) || [];
    const audioPath = req.files?.audio?.[0]?.path || null;

    // Validate required images
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
      ward: `ward${ward}`, // Convert "5" to "ward5"
      isAnonymous: isAnonymous === "true",
      images: imagePaths,
      audio: audioPath,
      latitude,
      longitude,
      status: "pending", // default status
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
