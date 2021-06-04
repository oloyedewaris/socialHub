const mongoose = require("mongoose");

const { Schema } = mongoose;

const UserSchema = new Schema({
  avatarColor: String,
  firstName: {
    type: String,
    trim: true,
    required: true
  },
  lastName: {
    type: String,
    trim: true,
    required: true
  },
  bio: {
    type: String,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  followersId: {
    type: [{ type: Schema.Types.ObjectId, ref: "User" }],
    default: []
  },
  followingId: {
    type: [{ type: Schema.Types.ObjectId, ref: "User" }],
    default: []
  },
  registeredAt: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("User", UserSchema);
