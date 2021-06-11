const bcrypt = require("bcryptjs");

//User Model
const User = require("../models/User");

//Post Model
const Post = require("../models/Post");

// // Users Controllers // //

exports.getAllUsers = (req, res) => {
  return User.find()
    .populate("followersId")
    .populate("followingId")
    .select("-password")
    .sort({ timestamp: -1 })
    .then(users => {
      const filteredUsers = users.filter(
        user => req.user._id.toString() !== user._id.toString()
      );
      return res.status(200).json(filteredUsers);
    })
    .catch(err => res.json(err).status(400));
};

// exports.findUserById = (req, res) => {
//   const { id } = req.params;

//   User.findById(id)
//     .select("-password")
//     .then((user) => res.json(user))
//     .catch((err) => res.status(404).json(err));
// };

exports.followings = (req, res) => {
  const { id } = req.params;
  const { followingId } = req.body;

  if (!followingId) {
    return res.status(404).json({ message: "No ID found" });
  }

  try {
    User.findByIdAndUpdate(
      id,
      {
        $addToSet: {
          followingId: followingId
        }
      },
      { new: true, upsert: true },
      (err, doc) => {
        if (err) {
          return res.status(400).json(err);
        }
        return User.find()
          .populate("followersId")
          .populate("followingId")
          .select("-password")
          .sort({ timestamp: -1 })
          .then(users => {
            currUser = users.find(
              user => user._id.toString() === req.user._id.toString()
            );
            const filteredUsers = users.filter(
              user => req.user._id.toString() !== user._id.toString()
            );
            return res
              .status(200)
              .json({ users: filteredUsers, user: currUser });
          })
          .catch(err => res.json(err).status(400));
      }
    );
  } catch (e) {
    return res.status(500).json(e);
  }
};

exports.unfollowings = (req, res) => {
  const { id } = req.params;
  const { unfollowingId } = req.body;

  if (!unfollowingId) {
    return res.status(404).json({ message: "Nothing found" });
  }

  try {
    User.findByIdAndUpdate(
      id,
      {
        $pull: {
          followingId: unfollowingId
        }
      },
      { new: true, upsert: true },
      (err, doc) => {
        if (err) {
          return res.status(400).json(err);
        }
        return User.find()
          .populate("followersId")
          .populate("followingId")
          .select("-password")
          .sort({ timestamp: -1 })
          .then(users => {
            currUser = users.find(
              user => user._id.toString() === req.user._id.toString()
            );
            const filteredUsers = users.filter(
              user => req.user._id.toString() !== user._id.toString()
            );
            return res
              .status(200)
              .json({ users: filteredUsers, user: currUser });
          })
          .catch(err => res.json(err).status(400));
      }
    );
  } catch (e) {
    return res.status(500).json(e);
  }
};

exports.followers = (req, res) => {
  const { id } = req.params;
  const { followerId } = req.body;

  if (!followerId) {
    return res.status(404).json({ message: "No ID found" });
  }

  try {
    User.findByIdAndUpdate(
      id,
      {
        $addToSet: {
          followersId: followerId
        }
      },
      { new: true, upsert: true },
      (err, doc) => {
        if (err) {
          return res.status(400).json(err);
        }
        return User.find()
          .populate("followersId")
          .populate("followingId")
          .select("-password")
          .sort({ timestamp: -1 })
          .then(users => {
            currUser = users.find(
              user => user._id.toString() === req.user._id.toString()
            );
            const filteredUsers = users.filter(
              user => req.user._id.toString() !== user._id.toString()
            );
            return res
              .status(200)
              .json({ users: filteredUsers, user: currUser });
          })
          .catch(err => res.json(err).status(400));
      }
    );
  } catch (e) {
    return res.status(500).json(e);
  }
};

exports.unfollowers = (req, res) => {
  const { id } = req.params;
  const { unfollowerId } = req.body;

  if (!unfollowerId) {
    return res.status(404).json({ message: "No ID found" });
  }

  try {
    User.findByIdAndUpdate(
      id,
      {
        $pull: {
          followersId: unfollowerId
        }
      },
      { new: true, upsert: true },
      (err, doc) => {
        if (err) {
          return res.status(400).json(err);
        }
        return User.find()
          .populate("followersId")
          .populate("followingId")
          .select("-password")
          .sort({ timestamp: -1 })
          .then(users => {
            currUser = users.find(
              user => user._id.toString() === req.user._id.toString()
            );
            const filteredUsers = users.filter(
              user => req.user._id.toString() !== user._id.toString()
            );
            return res
              .status(200)
              .json({ users: filteredUsers, user: currUser });
          })
          .catch(err => res.json(err).status(400));
      }
    );
  } catch (e) {
    return res.status(500).json(e);
  }
};

exports.settings = (req, res) => {
  const userId = req.params.id;
  const Email = req.body.email;
  const FirstName = req.body.firstName;
  const LastName = req.body.lastName;
  const Bio = req.body.bio;
  const Password = req.body.password;
  const NewPassword = req.body.newPassword;

  if (!Password && !Email && !FirstName && !LastName && !Bio) {
    return res.status(400).json("Nothing to update");
  } else if (!Password) {
    return res.status(400).json("No Password");
  } else if (!Email && !FirstName && !LastName && !Bio && !NewPassword) {
    return res.status(400).json("Please complete all fields");
  }

  if (NewPassword && NewPassword.length < 6) {
    return res.status(400).json("Password should be at least six characters");
  }

  try {
    if (req.query.type === "dataChange") {
      //Compare password before update settings
      bcrypt.compare(Password, req.user.password).then(isMatch => {
        if (!isMatch) {
          return res.status(400).json("Invalid password");
        } else {
          if (Email) {
            //Check for existing email
            User.findOne({ email: Email }).then(user => {
              if (user) {
                return res.status(400).json("Email already used");
              } else {
                //Update if doesnt exist before
                User.findByIdAndUpdate(
                  userId,
                  {
                    $set: {
                      email: Email
                    }
                  },
                  { new: true, upsert: true },
                  err => {
                    if (err) throw err;
                    return User.findById(userId)
                      .populate("followersId")
                      .populate("followingId")
                      .select("-password")
                      .then(user => res.json(user))
                      .catch(err => res.status(404).json(err));
                  }
                );
              }
            });
          }

          if (FirstName && LastName) {
            //To change all previous posts

            //Update user names
            User.findByIdAndUpdate(
              userId,
              {
                $set: {
                  firstName: FirstName,
                  lastName: LastName
                }
              },
              { new: true, upsert: true },
              err => {
                if (err) throw err;
                return User.findById(userId)
                  .populate("followersId")
                  .populate("followingId")
                  .select("-password")
                  .then(user => res.json(user))
                  .catch(err => res.status(404).json(err));
              }
            );
          }

          if (Bio) {
            User.findByIdAndUpdate(
              userId,
              {
                $set: {
                  bio: Bio
                }
              },
              { new: true, upsert: true },
              err => {
                if (err) throw err;
                return User.findById(userId)
                  .populate("followersId")
                  .populate("followingId")
                  .select("-password")
                  .then(user => res.json(user))
                  .catch(err => res.status(404).json(err));
              }
            );
          }
        }
      });

      if (!userId) {
        return res.status(404).json({ message: "User not found." });
      }
    } else if (req.query.type === "passwordChange") {
      bcrypt.compare(Password, req.user.password).then(isMatch => {
        if (!isMatch) {
          return res.status(400).json("Invalid password");
        } else {
          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(NewPassword, salt, (err, hash) => {
              if (err) throw err;
              // newPassword = hash;
              User.findByIdAndUpdate(
                userId,
                {
                  $set: {
                    password: hash
                  }
                },
                { new: true, upsert: true },
                err => {
                  if (err) throw err;
                  return User.findById(userId)
                    .populate("followersId")
                    .populate("followingId")
                    .select("-password")
                    .then(user => res.json(user))
                    .catch(err => res.status(404).json(err));
                }
              );
            });
          });
        }
      });
    }
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};
