const {   getDiscussionsByType,
  createComment,
  addReply } = require('../Controllers/discussionController');
const express = require('express');
const router = express.Router();

router.use(express.json());

// Get discussions by type (ward or municipality)
router.get('/:type', getDiscussionsByType);
// Create a new top-level comment
router.post('/comment', createComment);
// Add a reply to a comment
router.post('/reply/:id', addReply);


// Export the router
module.exports = router;