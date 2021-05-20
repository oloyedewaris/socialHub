const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const mongoKey = require("./config/keys");
const users = require("./routes/api/users");
const auth = require("./routes/api/auth");
const post = require("./routes/api/posts");

const app = express();

//Using Middlewares
app.use(express.json());
app.use(cors());

//Config  mongodb
const db = mongoKey.mongoURI;

//Connect to db
mongoose
  .connect(db, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("Mongodb is connected"))
  .catch((err) => console.log(err));

//use routes
app.use("/api/users", users);
app.use("/api/auth", auth);
app.use("/api/posts", post);

//Serve static assets if in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client", "build")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Port is working at ${port}`);
});
