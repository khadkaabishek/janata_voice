const Discussion = require('../Models/discussion');
const User = require('../Models/user');

// Use a default ObjectId string for testing (replace with a real User _id if needed)
const DEFAULT_USER_ID = '664e5f1a2b5e4b0012e9b123';

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
    res.status(500).json({ message: err.message });
  }
};

// Create a new top-level comment
const createComment = async (req, res) => {
  const { content, type } = req.body;

  if (!content || !type) {
    return res.status(400).json({ message: 'Missing fields' });
  }
  // Use authenticated user if available, otherwise fallback to default
  const userId = req.user && req.user._Id ? req.user._Id : DEFAULT_USER_ID;

  try {
    const newComment = new Discussion({
      content,
      commentedBy: userId,
      type
    });

    await newComment.save();

    // Populate user data before sending response
    const populatedComment = await Discussion.findById(newComment._id)
      .populate('commentedBy', 'name role avatar');

    res.status(201).json(populatedComment);
  } catch (err) {
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
  // Use authenticated user if available, otherwise fallback to default
  const userId = req.user && req.user._Id ? req.user._Id : DEFAULT_USER_ID;

  try {
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

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getDiscussionsByType,
  createComment,
  addReply
};
