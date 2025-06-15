const Discussion = require('../Models/discussion');
const User = require('../Models/user');

// Get all discussions by type
const getDiscussionsByType = async (req, res) => {
  const { type } = req.params;

  if (!['ward', 'municipality'].includes(type)) {
    return res.status(400).json({ message: 'Invalid discussion type' });
  }

  try {
    const discussions = await Discussion.find({ type })
      .populate('commentedBy', 'name role avatar')
      .populate('replies.repliedBy', 'name role avatar')
      .sort('-createdAt');

    res.json(discussions);
  } catch (err) {
    console.error('Error fetching discussions:', err);
    res.status(500).json({ message: err.message });
  }
};

// Create a new top-level comment
const createComment = async (req, res) => {
  const { content, type } = req.body;

  if (!content || !type) {
    return res.status(400).json({ message: 'Missing fields' });
  }

  // Check if user is authenticated
  if (!req.user || !req.user._id) {
    return res.status(401).json({ message: 'Authentication required' });
  }

  const userId = req.user._id; // Fixed: was _Id, should be _id

  try {
    // Verify user exists
    const userExists = await User.findById(userId);
    if (!userExists) {
      return res.status(404).json({ message: 'User not found' });
    }

    const newComment = new Discussion({
      content,
      commentedBy: userId,
      type
    });

    await newComment.save();

    // Populate user data before sending response
    const populatedComment = await Discussion.findById(newComment._id)
      .populate('commentedBy', 'name role avatar');

    console.log('Created comment:', populatedComment); // Debug log

    res.status(201).json(populatedComment);
  } catch (err) {
    console.error('Error creating comment:', err);
    res.status(500).json({ message: err.message });
  }
};

// Add a reply to a comment
const addReply = async (req, res) => {
  const { id } = req.params;
  const { content } = req.body;

  if (!content) {
    return res.status(400).json({ message: 'Content is required' });
  }

  // Check if user is authenticated
  if (!req.user || !req.user._id) {
    return res.status(401).json({ message: 'Authentication required' });
  }

  const userId = req.user._id; // Fixed: was _Id, should be _id

  try {
    // Verify user exists
    const userExists = await User.findById(userId);
    if (!userExists) {
      return res.status(404).json({ message: 'User not found' });
    }

    const updated = await Discussion.findByIdAndUpdate(
      id,
      {
        $push: {
          replies: {
            content,
            repliedBy: userId
          }
        }
      },
      { new: true }
    ).populate('commentedBy', 'name role avatar')
     .populate('replies.repliedBy', 'name role avatar');

    if (!updated) {
      return res.status(404).json({ message: 'Discussion not found' });
    }

    console.log('Added reply to discussion:', updated); // Debug log

    res.json(updated);
  } catch (err) {
    console.error('Error adding reply:', err);
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getDiscussionsByType,
  createComment,
  addReply
};