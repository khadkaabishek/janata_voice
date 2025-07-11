const mongoose = require('mongoose');

// Reply Subschema
const replySchema = new mongoose.Schema({
  content: {
    type: String,
    required: true
  },
  repliedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

// Main Discussion Schema
const discussionSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true
  },
  commentedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  replies: [replySchema],
  // Optional: specify discussion type like ward/municipality
  type: {
    type: String,
    enum: ['ward', 'municipality'],
    default: 'ward'
  }
}, { timestamps: true });

module.exports = mongoose.model('Discussion', discussionSchema);
module.exports.replySchema = replySchema; // Export reply schema if needed separately