const express = require('express');
const router = express.Router();
const {
  getDiscussionsByType,
  createComment,
  addReply
} = require('../Controllers/discussionController');

// Get discussions by type (ward or municipality)
// Supports: /api/discussion/ward or /api/discussion/type/ward
router.get('/:type', getDiscussionsByType);
router.get('/type/:type', getDiscussionsByType);

// Create a new top-level comment
// Supports: /api/discussion or /api/discussion/comment
router.post('/', createComment);
router.post('/comment', createComment);

// Add a reply to a comment
// Supports: /api/discussion/reply/:id and /api/discussion/:id/reply
router.post('/reply/:id', addReply);
router.post('/:id/reply', addReply);

module.exports = router;
