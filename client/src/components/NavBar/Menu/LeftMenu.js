import React from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { HomeOutlined, SearchOutlined, UserOutlined, SettingOutlined } from "@ant-design/icons";

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const LeftMenu = () => {
  const isAuth = useSelector(state => state.auth.isAuthenticated);

  return (
    <Menu mode='horizontal'>
      <Menu.Item key="home">
        <Link to="/">
          <HomeOutlined /> Home
        </Link>
      </Menu.Item>
      {isAuth &&
        <React.Fragment>
          <Menu.Item key="profile">
            <Link to="/profile">
              <UserOutlined /> Profile
            </Link>
          </Menu.Item>
          <Menu.Item key="settings">
            <Link to="/settings">
              <SettingOutlined /> Settings
            </Link>
          </Menu.Item>
          <Menu.Item key="discover">
            <Link to="/discover">
              <SearchOutlined /> Discover
            </Link>
          </Menu.Item>
        </React.Fragment>}
      {/* <Menu.Item key="portfolio">
        <a
          href="https://waris-portfolio.herokuapp.com"
          rel="noreferrer"
          target="_blank"
         
        >
          My Portfolio
        </a>
      </Menu.Item>
      <SubMenu title={<span>More</span>}>
        <MenuItemGroup title="Me">
          <Menu.Item key="setting:1">
            <Link to="/contact">
              Contact
            </Link>
          </Menu.Item>
          <Menu.Item key="setting:2">
            <Link to="/about">
              About
            </Link>
          </Menu.Item>
        </MenuItemGroup>
      </SubMenu> */}
    </Menu>
  );
};

export default LeftMenu;
