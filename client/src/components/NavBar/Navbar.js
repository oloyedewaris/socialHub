import React, { useState } from "react";
import LeftMenu from "./LeftMenu";
import RightMenu from "./RightMenu";
import { Drawer, Button } from "antd";
import { MenuFoldOutlined } from "@ant-design/icons";
import "./navbar.css";

const Navbar = () => {
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
          <LeftMenu mode="horizontal" />
        </div>
        <div className="rightMenu">
          <RightMenu mode="horizontal" />
        </div>
        <Button className="barsMenu" type="primary" onClick={showDrawer}>
          <MenuFoldOutlined type="align-right" />
        </Button>
        <Drawer
          title="Social Space"
          placement="right"
          closable={true}
          onClose={onClose}
          visible={visible}
        >
          <LeftMenu mode="inline" />
          <RightMenu mode="inline" />
        </Drawer>
      </div>
    </nav>
  );
};

export default Navbar;
