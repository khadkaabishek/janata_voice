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
    res.status(500).json({ message: err.message });
  }
};

// Create a new top-level comment
const createComment = async (req, res) => {
  const { content, type } = req.body;

  if (!content || !type || !req.user._Id) {
    return res.status(400).json({ message: 'Missing fields' });
  }

  try {
    const user = req.user._Id;
    if (!user) return res.status(404).json({ message: 'User not found' });

    const newComment = new Discussion({
      content,
      commentedBy: req.user._Id,
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

  if (!content ) {
    return res.status(400).json({ message: 'Content and userId are required' });
  }

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const updated = await Discussion.findByIdAndUpdate(
      id,
      {
        $push: {
          replies: {
            content,
            repliedBy: req.user._userId
          }
        }
      },
      { new: true }
    ).populate('replies.repliedBy', 'name role avatar');

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