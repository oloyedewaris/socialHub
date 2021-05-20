const mongoose = require("mongoose");

const { Schema } = mongoose;

const PostSchema = new Schema({
  authorId: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  comments: {
    type: [
      {
        commenterId: String,
        commenter: String,
        text: String,
        timestamp: Number,
      },
    ],
    default: [],
    required: true,
  },
  likers: {
    type: [String],
    default: [],
    required: true,
  },
  likersId: {
    type: [String],
    default: [],
    required: true,
  },
  likesCount: {
    type: Number,
    default: 0,
    required: true,
  },
  text: {
    type: String,
    trim: true,
    required: true,
  },
  timestamp: {
    type: Number,
    required: true,
  },
  postedTime: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Post", PostSchema);
