const issue=require('../Models/issue');
const interaction = require('../Models/interaction');


//creating issue through form from frontend
const createIssue = async (req, res) => {
    try {
        const { title, discription, ward, category, location, status } = req.body;

        // Validate required fields
        if (!title || !discription || !ward || !category || !location || !status) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Create a new issue
        const newIssue = new issue({
            title,
            discription,
            ward,
            category,
            location,
            status
        });

        // Save the issue to the database
        await newIssue.save();

        res.status(201).json({ message: "Issue created successfully", issue: newIssue });
    } catch (error) {
        console.error("Error creating issue:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

// Fetching all issues from the database to the issues section in frontend
const getAllIssues = async (req, res) => {
    try {
        const issues = await issue.find().populate('interaction');
        res.status(200).json(issues);
    } catch (error) {
        console.error("Error fetching issues:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}


//My report section in frontend
// Fetching issues created by the user for the my report section in frontend
const getMyIssues = async (req, res) => {
    try {
        const userId = req.user._id; // Assuming user ID is stored in req.user
        const issues = await issue.find({ createdBy: userId }).populate('interaction');

        if (issues.length === 0) {
            return res.status(404).json({ message: "No issues found for this user" });
        }

        res.status(200).json(issues);
    } catch (error) {
        console.error("Error fetching user's issues:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}
//updating the issue from the my report section in frontend
const updateIssue = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, discription, ward, category, location, status } = req.body;

        // Validate required fields
        if (!title || !discription || !ward || !category || !location || !status) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const updatedIssue = await issue.findByIdAndUpdate(id, {
            title,
            discription,
            ward,
            category,
            location,
            status
        }, { new: true });

        if (!updatedIssue) {
            return res.status(404).json({ message: "Issue not found" });
        }

        res.status(200).json({ message: "Issue updated successfully", issue: updatedIssue });
    } catch (error) {
        console.error("Error updating issue:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}
//deleting the issue from the my report section in frontend
const deleteIssue = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedIssue = await issue.findByIdAndDelete(id);

        if (!deletedIssue) {
            return res.status(404).json({ message: "Issue not found" });
        }

        res.status(200).json({ message: "Issue deleted successfully" });
    } catch (error) {
        console.error("Error deleting issue:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

//ward issues section in frontend
// Fetching issues by ward for the ward issues section in frontend
const getIssuesByWard = async (req, res) => {
    try {
        const { ward } = req.params;
        const issues = await issue.find({ ward }).populate('interaction');

        if (issues.length === 0) {
            return res.status(404).json({ message: "No issues found for this ward" });
        }

        res.status(200).json(issues);
    } catch (error) {
        console.error("Error fetching issues by ward:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

module.exports = {
    createIssue,
    getAllIssues,
    getMyIssues,
    updateIssue,
    deleteIssue,
    getIssuesByWard
};
// This code defines the issueController for handling issues in a community management application.
// It includes functions to create, retrieve, update, and delete issues, as well as to fetch issues by ward.

