import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Login from "./screen/Login";
import RegisterUser from "./screen/Register";
import Discover from "./screen/Discover/Discover";
import Follow from "./screen/Follow/Follow";
import Profile from "./screen/Profile/Profile";
import auth from "./hoc/auth";
import Footer from "./components/Footer/Footer";
import Contact from "./components/Details/Contact";
import About from "./components/Details/About";
import Navbar from "./components/NavBar/Navbar";
import Whoops404 from "./Utils/Whoops404";
import Settings from "./screen/Settings/Settings";
import PostsFeed from "./screen/Posts/PostsFeed";
import Post from "./screen/Posts/Post";
import LS from "./hoc/navWrapper";

const loggedEmail = localStorage.getItem("w-s-email");
const loggedPassword = localStorage.getItem("w-s-password");

const App = () => {
  return (
    <>
      <Navbar />
      <Switch>
        <Route exact path="/" render={() => loggedEmail && loggedPassword ? <Redirect to="/home" /> : <Login />} />
        <Route exact path="/register" component={RegisterUser} />
        <Route exact path="/discover" component={auth(LS(Discover))} />
        <Route exact path="/follow" component={auth(LS(Follow))} />
        <Route exact path="/home" component={auth(LS(PostsFeed))} />
        <Route exact path="/post/:id" component={auth(LS(Post))} />
        <Route exact path="/profile" component={auth(LS(Profile))} />
        <Route exact path="/settings" component={auth(LS(Settings))} />
        <Route exact path="/contact" component={Contact} />
        <Route exact path="/about" component={About} />
        <Route component={Whoops404} />
      </Switch>
      <div className="footer">
        <Footer />
      </div>
    </>
  );
};

export default App;
