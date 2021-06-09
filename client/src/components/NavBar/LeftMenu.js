import React from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom";

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const LeftMenu = ({ mode, onClose }) => {
  return (
    <Menu mode={mode}>
      <Menu.Item key="home">
        <Link to="/" onClick={onClose}>
          Home
        </Link>
      </Menu.Item>
      <Menu.Item key="portfolio">
        <a
          href="https://waris-portfolio.herokuapp.com"
          rel="noreferrer"
          target="_blank"
          onClick={onClose}
        >
          My Portfolio
        </a>
      </Menu.Item>
      <SubMenu title={<span>More</span>}>
        <MenuItemGroup title="Me">
          <Menu.Item key="setting:1">
            <Link to="/contact" onClick={onClose}>
              Contact
            </Link>
          </Menu.Item>
          <Menu.Item key="setting:2">
            <Link to="/about" onClick={onClose}>
              About
            </Link>
          </Menu.Item>
        </MenuItemGroup>
      </SubMenu>
    </Menu>
  );
};

export default LeftMenu;
