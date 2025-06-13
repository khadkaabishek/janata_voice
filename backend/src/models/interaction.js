const mongoose = require('mongoose');

const interactionSchema = new mongoose.Schema({
  // votes
  isVote: {
    type: Number,
    enum: [0, 1]
  },
  voteBy: {
    type: mongoose.Schema.Types.ObjectId,
    // ref: "User"
  },
  issue: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "issue",
    required: true // ensure interaction must be related to an issue
  },
  // comments
  comment: {
    type: String
  },
  commentBy: {
    type: mongoose.Schema.Types.ObjectId,
    // ref: "User"
  },
  // replies
  reply: {
    type: String
  },
  replyBy: {
    type: mongoose.Schema.Types.ObjectId,
    // ref: "User"
  },
  commentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "interaction"
  },
  // follow
  follow: {
    type: mongoose.Schema.Types.ObjectId,
    // ref: "User"
  }
}, { timestamps: true });

module.exports = mongoose.model('interaction', interactionSchema);
