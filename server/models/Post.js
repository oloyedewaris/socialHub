const mongoose = require("mongoose");
const { Schema } = mongoose;

const CommentSchema = new Schema({
  commenter: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  text: String,
  timestamp: Number
});

const PostSchema = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  comments: {
    type: [CommentSchema],
    default: [],
    required: true
  },
  likers: {
    type: [{ type: Schema.Types.ObjectId, ref: "User" }],
    default: [],
    required: true
  },
  text: {
    type: String,
    trim: true,
    required: true
  },
  timestamp: {
    type: Number,
    required: true
  },
  postedTime: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model("Post", PostSchema);
