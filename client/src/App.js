import React from "react";
import { Switch, Route } from "react-router-dom";
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
import Settings from "./components/Settings/Settings";
import Name from "./components/Settings/Sections/Name";
import Email from "./components/Settings/Sections/Email";
import Password from "./components/Settings/Sections/Password";
import Bio from "./components/Settings/Sections/Bio";
import PostsFeed from "./components/Posts/PostsFeed";

const App = () => {
  return (
    <>
      <Navbar />
      <div>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/register" component={RegisterUser} />
          <Route exact path="/discover" component={auth(Discover)} />
          <Route exact path="/follow" component={auth(Follow)} />
          <Route exact path="/home" component={auth(PostsFeed)} />
          <Route exact path="/profile" component={auth(Profile)} />
          <Route exact path="/profile/settings" component={auth(Settings)} />
          <Route exact path="/profile/settings/name" component={auth(Name)} />
          <Route exact path="/profile/settings/email" component={auth(Email)} />
          <Route exact path="/profile/settings/bio" component={auth(Bio)} />
          <Route
            exact
            path="/profile/settings/password"
            component={auth(Password)}
          />
          <Route exact path="/contact" component={Contact} />
          <Route exact path="/about" component={About} />
          <Route component={Whoops404} />
          <Route
            exact
            path="/profile/settings/password"
            component={auth(Password)}
          />
        </Switch>
      </div>
      <div className="footer">
        <Footer />
      </div>
    </>
  );
};

export default App;
