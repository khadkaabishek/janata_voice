const express = require("express");
const router = express.Router();
const Issue = require("../Models/issue");

// POST /api/issue/:id/vote
router.post("/:id/vote", async (req, res) => {
  try {
    const issueId = req.params.id;
    const { userId } = req.body;

    if (!userId) return res.status(400).json({ message: "Missing userId" });

    const issue = await Issue.findById(issueId);
    if (!issue) return res.status(404).json({ message: "Issue not found" });

    // Make sure issue.voters is an array (store userIds who voted)
    issue.voters = issue.voters || [];

    const voterIndex = issue.voters.indexOf(userId);
    if (voterIndex === -1) {
      // User has NOT voted, add userId to voters
      issue.voters.push(userId);
    } else {
      // User HAS voted, remove userId (toggle off)
      issue.voters.splice(voterIndex, 1);
    }

    // Update votes count as length of voters array
    issue.votes = issue.voters.length;

    await issue.save();

    res.json({ votes: issue.votes });
  } catch (error) {
    console.error("Vote toggle error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
