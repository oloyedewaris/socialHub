const Post = require("../models/Post");

// // Posts Controllers // //

exports.createPost = (req, res) => {
  //Create a new post
  const newPost = new Post({
    author: req.body.author,
    authorId: req.body.authorId,
    comments: [],
    likers: [],
    likersId: [],
    likesCount: 0,
    text: req.body.text,
    postedTime: Date.now(),
    timestamp: new Date().getTime(),
  });
  newPost
    .save()
    .then((post) => {
      Post.find()
        .sort({ timestamp: -1 })
        .then((posts) => res.status(200).json(posts))
        .catch((err) => res.json(err).status(400));
    })
    .catch((err) => res.status(400).send(err));
};

exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    await post.remove();
    return Post.find()
      .sort({ timestamp: -1 })
      .then((posts) => res.status(200).json(posts))
      .catch((err) => res.json(err).status(400));
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
          $inc: { likesCount: 1 },
          $addToSet: {
            likers: req.body.user,
            likersId: req.body.userId,
          },
        },
        { new: true },
        (err, post) => {
          if (err) return res.status(400).send(err);
          return Post.find()
            .sort({ timestamp: -1 })
            .then((posts) => res.status(200).json(posts))
            .catch((err) => res.json(err).status(400));
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
          $inc: { likesCount: -1 },
          $pull: {
            likers: req.body.user,
            likersId: req.body.userId,
          },
        },
        { new: true },
        (err, post) => {
          if (err) return res.status(400).send(err);
          return Post.find()
            .sort({ timestamp: -1 })
            .then((posts) => res.status(200).json(posts))
            .catch((err) => res.json(err).status(400));
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
              commenterId: req.body.commenterId,
              commenter: req.body.commenter,
              text: req.body.text,
              timestamp: new Date().getTime(),
            },
          },
        },
        { new: true },
        (err, post) => {
          if (err) return res.status(400).send(err);
          return Post.find()
            .sort({ timestamp: -1 })
            .then((posts) => res.status(200).json(posts))
            .catch((err) => res.json(err).status(400));
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
              _id: req.body.commentId,
            },
          },
        },
        { new: true },
        (err, post) => {
          if (err) return res.status(400).send(err);
          return Post.find()
            .sort({ timestamp: -1 })
            .then((posts) => res.status(200).json(posts))
            .catch((err) => res.json(err).status(400));
        }
      );
    } catch (err) {
      return res.status(400).send(err);
    }
  }
};
