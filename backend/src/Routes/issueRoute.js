const { createIssue,
    getAllIssues,
    getMyIssues,
    updateIssue,
    deleteIssue,
    getIssuesByWard } = require('../Controllers/issueController');
const express = require('express');
const router = express.Router();

// Route to create a new issue
router.post('/create', createIssue);


// Route to get all issues                  
router.get('/all', getAllIssues);


// Route to get issues by ward
router.get('/ward/:ward', getIssuesByWard);

// Route to get issues reported by the user
router.get('/my-issues', getMyIssues);
// Route to update an issue
router.put('/update/:id', updateIssue);
// Route to delete an issue
router.delete('/delete/:id', deleteIssue);


// Export the router
module.exports = router;
// This code sets up the issue routes for handling issues in a community management application.
// It includes routes for creating, retrieving, updating, and deleting issues, as well as fetching issues by ward.

