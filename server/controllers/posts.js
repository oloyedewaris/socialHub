const Post = require("../models/Post");

// // Posts Controllers // //

//creates a new post
exports.createPost = (req, res) => {
  const newPost = new Post({
    author: req.body.authorId,
    comments: [],
    likers: [],
    likersId: [],
    text: req.body.text,
    postedTime: Date.now(),
    timestamp: new Date().getTime()
  });
  newPost
    .save()
    .then(post => {
      Post.find()
        .populate("author")
        .populate("comments.commenter")
        .sort({ timestamp: -1 })
        .then(posts => res.status(200).json(posts))
        .catch(err => res.json(err).status(400));
    })
    .catch(err => res.status(400).send(err));
};

//deletes a post
exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    await post.remove();
    return Post.find()
      .populate("author")
      .populate("comments.commenter")
      .sort({ timestamp: -1 })
      .then(posts => res.status(200).json(posts))
      .catch(err => res.json(err).status(400));
  } catch (err) {
    return res.status(404).send(err);
  }
};

exports.updatePost = (req, res) => {
  const { id } = req.params;

  //Perform the like action
  if (req.body.action === "like") {
    try {
      return Post.findByIdAndUpdate(
        id,
        {
          $addToSet: {
            likers: req.body.userId
          }
        },
        { new: true },
        (err, post) => {
          if (err) return res.status(400).send(err);
          return Post.find()
            .populate("author")
            .populate("comments.commenter")
            .sort({ timestamp: -1 })
            .then(posts => res.status(200).json(posts))
            .catch(err => res.json(err).status(400));
        }
      );
    } catch (err) {
      return res.status(400).send(err);
    }
  }

  //Perform the unlike action
  if (req.body.action === "unlike") {
    try {
      return Post.findByIdAndUpdate(
        id,
        {
          $pull: {
            likers: req.body.userId
          }
        },
        { new: true },
        (err, post) => {
          if (err) return res.status(400).send(err);
          return Post.find()
            .populate("author")
            .populate("comments.commenter")
            .sort({ timestamp: -1 })
            .then(posts => res.status(200).json(posts))
            .catch(err => res.json(err).status(400));
        }
      );
    } catch (err) {
      return res.status(400).send(err);
    }
  }

  //Perform the comment action
  if (req.body.action === "addComment") {
    try {
      return Post.findByIdAndUpdate(
        id,
        {
          $push: {
            comments: {
              commenter: req.body.commenterId,
              text: req.body.text,
              timestamp: new Date().getTime()
            }
          }
        },
        { new: true },
        (err, post) => {
          if (err) return res.status(400).send(err);
          return Post.find()
            .populate("author")
            .populate("comments.commenter")
            .sort({ timestamp: -1 })
            .then(posts => res.status(200).json(posts))
            .catch(err => res.json(err).status(400));
        }
      );
    } catch (err) {
      return res.status(400).send(err);
    }
  }

  //Perform the delete comment action
  if (req.body.action === "deleteComment") {
    try {
      return Post.findByIdAndUpdate(
        id,
        {
          $pull: {
            comments: {
              _id: req.body.commentId
            }
          }
        },
        { new: true },
        (err, post) => {
          if (err) return res.status(400).send(err);
          return Post.find()
            .populate("author")
            .populate("comments.commenter")
            .sort({ timestamp: -1 })
            .then(posts => res.status(200).json(posts))
            .catch(err => res.json(err).status(400));
        }
      );
    } catch (err) {
      return res.status(400).send(err);
    }
  }
};
