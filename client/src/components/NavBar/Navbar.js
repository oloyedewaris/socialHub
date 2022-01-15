import React, { useState } from "react";
import LeftMenu from "./Menu/LeftMenu";
import RightMenu from "./Menu/RightMenu";
import MobileMenu from "./Menu/MobileMenu"
import "./navbar.css";

const Navbar = () => {
  return (
    <>
      <nav className="menuBar">
        <div className="logo">
          <a className="logo_img" href="/">SocialHub</a>
        </div>
        <div className="menuCon">
          <div className="leftMenu">
            <LeftMenu />
          </div>
          <div className="rightMenu">
            <RightMenu />
          </div>
        </div>
      </nav>
      <nav className="mobile_bar">
        <MobileMenu />
      </nav>
    </>
  );
};

export default Navbar;
