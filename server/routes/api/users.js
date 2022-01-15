const express = require("express");
const usersController = require("../../controllers/users.js");
const router = express.Router();

const auth = require("../../middleWare/auth");

// // Users Routes // //

//@route --get api/users
//@description --get all users
//@access --public
router.get("/", auth, usersController.getAllUsers);

// //Following Routes// //

//@route --Get api/users/:id
//@description --Get a User By their id
//@access --private
// router.get("/:id", auth, usersController.findUserById);

//@route --patch api/users/followings/:id
//@description --Add a user to the list of users you are following
//@access --private
router.patch("/followings/:id", auth, usersController.followings);

//@route --patch api/users/unfollowings/:id
//@description --Remove a user from the list of users you are following
//@access --private
router.patch("/unfollowings/:id", auth, usersController.unfollowings);

//@route --patch api/users/followers/:id
//@description --Add a user to the list of users that are following you
//@access --private
router.patch("/followers/:id", auth, usersController.followers);

//@route --patch api/users/unfollowers/:id
//@description --Remove a user from the list of users that are following you
//@access --private
router.patch("/unfollowers/:id", auth, usersController.unfollowers);

//@route post --api/users/new_users
//@description --change user data
//@access --private
router.get("/new_users", auth, usersController.newUsers);

//@route post --api/users/settings:id
//@description --change user data
//@access --private
router.post("/settings/:id", auth, usersController.settings);

module.exports = router;
