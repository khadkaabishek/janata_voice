const { Schema, model, models } = require("mongoose");

const voteSchema = new Schema(
  {
    issue: {
      type: Schema.Types.ObjectId,
      ref: "issue",
      required: true,
    },
    voter: {
      type: String, // Can also use ObjectId if you want real users
      required: true,
    },
  },
  { timestamps: true }
);

const Vote = models.Vote || model("Vote", voteSchema);
module.exports = Vote;
