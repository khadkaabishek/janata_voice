const {
    createInteraction,
    fetchInteractions
}= require('../controllers/interactionController');
const express = require('express');
const router = express.Router();


// Route to create a new interaction (vote, comment, reply, follow)
router.post('/create', createInteraction);
// Route to fetch interactions related to a specific issue
router.get('/issue/:issueId', fetchInteractions);

// Export the router
module.exports = router;