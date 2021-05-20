import React, { useState } from "react";
import LeftMenu from "./LeftMenu";
import RightMenu from "./RightMenu";
import { Drawer, Button } from "antd";
import "./navbar.css";

const HomeNavbar = () => {
  const [visible, setvisible] = useState(false);

  const showDrawer = () => {
    setvisible(true);
  };

  const onClose = () => {
    setvisible(false);
  };

  return (
    <nav className="menuBar">
      <div className="logo">
        <a href="/">Social Space</a>
      </div>
      <div className="menuCon">
        <div className="leftMenu">
          <LeftMenu />
        </div>
        <div className="rightMenu">
          <RightMenu />
        </div>
        <Button className="barsMenu" type="primary" onClick={showDrawer}>
          <span className="barsBtn"></span>
        </Button>
        <Drawer
          title="Basic Drawer"
          placement="right"
          closable={false}
          onClose={onClose}
          visible={visible}
        >
          <LeftMenu />
          <RightMenu />
        </Drawer>
      </div>
    </nav>
  );
};

export default HomeNavbar;
