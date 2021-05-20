const express = require("express");
const router = express.Router();
const auth = require("../../middleWare/auth");
const authController = require("../../controllers/auth");

//Route for Authenticaions

//Check for user authentication
router.get("/auth", auth, (req, res) => {
  res.json(req.user);
});

//@route --post api/auth
//@description --Authenticate user before login
//@access --public
router.post("/", authController.loginUser);

//@route --post api/auth/register
//@description --register a new user
//@access --public
router.post("/register", authController.registerUser);

module.exports = router;
