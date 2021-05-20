const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// // Auth Controllers // //

//User Model
const User = require("../models/User");

exports.loginUser = (req, res) => {
  const { email, password } = req.body;

  // Simple validation
  if (!email || !password)
    return res.status(400).json("Please enter all field");

  //Check for existing user
  User.findOne({ email }).then((user) => {
    if (!user) return res.status(400).json("Email not found");

    //Compare user's password
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (!isMatch) return res.status(400).json("Invalid password");

      //Sign a jwt token
      jwt.sign({ id: user.id }, "waris", { expiresIn: 3600 }, (err, token) => {
        if (err) throw err;
        res.json({
          token,
          user: {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            bio: user.bio,
            registeredAt: user.registeredAt,
          },
        });
      });
    });
  });
};

exports.registerUser = (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  //Converting javascript date to human understandable
  const d = new Date();
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const weeks = ["Sun", "Mon", "Tues", "Wed", "Thur", "Fri", "Sat"];
  const date = `${weeks[d.getDay()]}, ${
    months[d.getMonth()]
  } ${d.getDate()} ${d.getFullYear()}`;

  // Simple validation
  if (!firstName || !lastName || !email || !password)
    return res.status(400).json("Please enter all field");
  if (password.length < 6)
    return res.status(400).json("Password should be up to six characters");

  //Check for existing user
  User.findOne({ email }).then((user) => {
    if (user) return res.status(400).json("Email already exist");

    //Create a new user
    const newUser = new User({
      firstName,
      lastName,
      email,
      password,
      registeredAt: date,
    });

    //Hash the user's password
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        newUser
          .save()
          .then((user) => {
            //sign a jwt token
            jwt.sign(
              { id: user.id },
              "waris",
              { expiresIn: 3600 },
              (err, token) => {
                if (err) throw err;
                res
                  .json({
                    token,
                    user: {
                      id: user.id,
                      firstName: user.firstName,
                      lastName: user.lastName,
                      email: user.email,
                      bio: user.bio,
                      registeredAt: user.registeredAt,
                    },
                  })
                  .status(201);
              }
            );
          })
          .catch((err) => res.status(400).json({ msg: "failed", error: err }));
      });
    });
  });
};