import React, { Component } from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom";

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const LeftMenu = ({ mode }) => {
  return (
    <Menu mode={mode}>
      <Menu.Item key="home">
        <Link to="/">Home</Link>
      </Menu.Item>
      <Menu.Item key="portfolio">
        <a href="https://waris-portfolio.herokuapp.com">Portfolio</a>
      </Menu.Item>
      <SubMenu title={<span>More</span>}>
        <MenuItemGroup title="Me">
          <Menu.Item key="setting:1">
            <Link to="/contact">Contact</Link>
          </Menu.Item>
          <Menu.Item key="setting:2">
            <Link to="/about">About</Link>
          </Menu.Item>
        </MenuItemGroup>
      </SubMenu>
    </Menu>
  );
};

export default LeftMenu;
