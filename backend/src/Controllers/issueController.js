const Issue = require("../Models/issue");

const createIssue = async (req, res) => {
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

    const imagePaths = req.files["images"]?.map((file) => file.path) || [];
    const audioPath = req.files["audio"]?.[0]?.path || null;

    const newIssue = new Issue({
      title,
      description,
      category,
      location,
      ward,
      isAnonymous: isAnonymous === "true",
      images: imagePaths,
      audio: audioPath,
      latitude,
      longitude,
    });

    await newIssue.save();

    res
      .status(201)
      .json({ message: "Issue created successfully", issue: newIssue });
  } catch (error) {
    console.error("Error creating issue:", error);
    res.status(500).json({ message: "Failed to create issue", error });
  }
};

module.exports = { createIssue };
