import React, { useEffect, useState } from "react";
import { Menu, Layout, Avatar } from "antd";
import {
  HomeOutlined,
  TeamOutlined,
  UserOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SearchOutlined,
  PoweroffOutlined,
  SettingOutlined
} from "@ant-design/icons";
import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/actions/authActions";

const { Header, Content, Sider } = Layout;

const Wrapper = props => {
  const [collapse, setcollapse] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const toggle = () => setcollapse(!collapse);
  const userName = useSelector(state => state.auth.user.firstName);
  const email = useSelector(state => state.auth.user.email);
  const dispatch = useDispatch();

  let username;
  let firstLetter;
  if (userName) {
    firstLetter = userName[0].toUpperCase();
    username = userName.replace(userName[0], firstLetter);
  }

  const onLogout = () => {
    dispatch(logout());
  };

  const deviceWidth = document.documentElement.clientWidth;

  var current;
  const location = useLocation();
  if (location.pathname === "/home") {
    current = "home";
  } else if (location.pathname === "/profile") {
    current = "profile";
  } else if (location.pathname === "/discover") {
    current = "discover";
  } else if (location.pathname === "/follow") {
    current = "follow";
  } else if (location.pathname.includes("/profile/settings")) {
    current = "settings";
  } else {
    current = null;
  }

  return (
    <div>
      <Layout>
        <Sider
          breakpoint="sm"
          className="sider"
          trigger={null}
          collapsible
          collapsedWidth={
            deviceWidth > 767 ? "80" : deviceWidth > 450 ? "70" : "40"
          }
          width={deviceWidth > 767 ? "200" : deviceWidth > 450 ? "160" : "120"}
          collapsed={collapse}
        >
          <Avatar className="nav-logo">{firstLetter}</Avatar>
          <Menu theme="dark" selectedKeys={[current]} mode="inline">
            <Menu.Item key="home" icon={<HomeOutlined className="menu-font" />}>
              <Link to="/home">{username}</Link>
            </Menu.Item>
            <Menu.Item
              icon={<UserOutlined className="menu-font" />}
              key="profile"
            >
              <Link to="/profile">Profile</Link>
            </Menu.Item>
            <Menu.Item
              icon={<SearchOutlined className="menu-font" />}
              key="discover"
            >
              <Link to="/discover">Discover</Link>
            </Menu.Item>
            <Menu.Item
              key="follow"
              icon={<TeamOutlined className="menu-font" />}
            >
              <Link to="/follow">Follow</Link>
            </Menu.Item>
            <Menu.Item
              key="settings"
              icon={<SettingOutlined className="menu-font" />}
            >
              <Link to="/profile/settings">Settings</Link>
            </Menu.Item>
            <Menu.Item
              icon={<PoweroffOutlined className="menu-font" />}
              onClick={onLogout}
            >
              <Link onClick={onLogout} to="/">
                Log Out
              </Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="layout">
          <Header className="layout-background">
            {React.createElement(
              collapse ? MenuUnfoldOutlined : MenuFoldOutlined,
              {
                className: "trigger",
                onClick: toggle
              }
            )}
            <p className="nav-email">{email}</p>
          </Header>
          <Content className="layout-background">
            <div className="scroll">{props.children}</div>
          </Content>
        </Layout>
      </Layout>
    </div>
  );
};

export default Wrapper;
