// Routes  Containing actions needed by Posts

const express = require("express");
const Post = require("../../models/Post");
const auth = require("../../middleWare/auth");
const postsController = require("../../controllers/posts");

const router = express.Router();

// // Posts Routes // //

//@route --post api/posts
//@description --Make a New Post
//@access --private
router.post("/", auth, postsController.createPost);

//@route-- delete api/posts/:id
//@description --Delete an Existing Post
//@access --private
router.delete("/:id", auth, postsController.deletePost);

//@route --patch api/posts/:id
//@description --Perform actions on posts like adding and removing likes, adding and deleting comments
//@access --private
router.patch("/:id", auth, postsController.updatePost);

router.get("/", auth, (req, res) => {
  Post.find()
    .sort({ timestamp: -1 })
    .then((posts) => res.status(200).json(posts))
    .catch((err) => res.json(err).status(400));
});

module.exports = router;
