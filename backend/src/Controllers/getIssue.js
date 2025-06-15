const Issue = require("./../Models/issue");

const getIssues = async (req, res) => {
  try {
    const query = {};

    if (req.query.search) {
      query.title = { $regex: req.query.search, $options: "i" };
    }
    if (req.query.category) {
      query.category = req.query.category;
    }
    if (req.query.status) {
      query.status = req.query.status;
    }
    if (req.query.ward) {
      query.wardNumber = parseInt(req.query.ward);
    }

    // Sorting logic
    let sortOption = { votes: -1 }; // Default sort
    if (req.query.sortBy === "recent") sortOption = { reportedAt: -1 };

    const issues = await Issue.find(query).sort(sortOption);

    res.status(200).json(issues);
  } catch (error) {
    console.error("Error fetching issues:", error);
    res.status(500).json({ message: "Failed to fetch issues" });
  }
};

module.exports = getIssues;
