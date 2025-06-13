const interaction= require('../models/interaction');

// Creating a new interaction (vote, comment, reply, follow)
const createInteraction = async (req, res) => {
    try {
        const { isVote, voteBy, issue, comment, commentBy, reply, replyBy, commentId, follow } = req.body;

        // Validate required fields
        if (!issue) {
            return res.status(400).json({ message: "Issue ID is required" });
        }

        // Create a new interaction
        const newInteraction = new interaction({
            isVote,
            voteBy,
            issue,
            comment,
            commentBy,
            reply,
            replyBy,
            commentId,
            follow
        });

        // Save the interaction to the database
        await newInteraction.save();

        res.status(201).json({ message: "Interaction created successfully", interaction: newInteraction });
    } catch (error) {
        console.error("Error creating interaction:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

// Fetching interactions related to a specific issue
const fetchInteractions = async (req, res) => {
    try {
        const issueId = req.params.issueId; // Assuming issue ID is passed as a URL parameter

        // Validate required fields
        if (!issueId) {
            return res.status(400).json({ message: "Issue ID is required" });
        }

        // Fetch interactions related to the issue
        const interactions = await interaction.find({ issue: issueId }).populate('voteBy commentBy replyBy follow');

        if (interactions.length === 0) {
            return res.status(404).json({ message: "No interactions found for this issue" });
        }

        res.status(200).json(interactions);
    } catch (error) {
        console.error("Error fetching interactions:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}
module.exports = {
    createInteraction,
    fetchInteractions
};

