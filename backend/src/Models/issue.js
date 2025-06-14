const mongoose = require("mongoose");

const issueSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "title is required"],
    },
    description: {
      type: String,
      required: [true, "description is required"],
    },
    ward: {
      type: String,
      required: [true, "ward is required"],
      enum: [
        "ward1",
        "ward2",
        "ward3",
        "ward4",
        "ward5",
        "ward6",
        "ward7",
        "ward8",
        "ward9",
        "ward10",
        "ward11",
        "ward12",
        "ward13",
        "ward14",
        "ward15",
        "ward16",
        "ward17",
        "ward18",
        "ward19",
        "ward20",
        "ward21",
        "ward22",
        "ward23",
        "ward24",
        "ward25",
        "ward26",
        "ward27",
        "ward28",
        "ward29",
        "ward30",
        "ward31",
        "ward32",
      ],
    },
    images: {
      type: [String],
      required: [true, "images are required"],
    },
    category: {
      type: String,
      required: [true, "category is required"],
      enum: ["sanitation", "road", "water", "electricity", "garbage", "other"],
    },
    location: {
      type: String,
      required: [true, "location is required"],
    },
    latitude: {
      type: String,
    },
    longitude: {
      type: String,
    },
    status: {
      type: String,
      required: [true, "status is required"],
      enum: ["pending", "in-progress", "resolved"],
    },

    // ✅ User reference
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Issue", issueSchema);
