import React, { useEffect, useState } from "react";
import { Menu, Layout } from "antd";
import {
  HomeOutlined,
  TeamOutlined,
  UserOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SearchOutlined,
  PoweroffOutlined
} from "@ant-design/icons";
import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../Flux/actions/authActions";
import Profile from "../components/Profile/Profile";

const { Header, Content, Sider } = Layout;

const Wrapper = props => {
  const [collapse, setcollapse] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const toggle = () => setcollapse(!collapse);
  const userName = useSelector(state => state.auth.user.firstName);
  const dispatch = useDispatch();

  const firstLetter = userName[0].toUpperCase();
  const username = userName.replace(userName[0], firstLetter);

  const onLogout = () => {
    dispatch(logout());
  };

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
  } else {
    current = null;
  }

  return (
    <div>
      <Layout>
        <Sider trigger={null} collapsible collapsed={collapse}>
          <Profile className="logo" />
          <Menu theme="dark" selectedKeys={[current]} mode="inline">
            <Menu.Item key="home" icon={<HomeOutlined />}>
              <Link to="/home" className="nav-link">
                {username}
              </Link>
            </Menu.Item>
            <Menu.Item icon={<UserOutlined />} key="profile">
              <Link to="/profile" className="nav-link">
                Profile
              </Link>
            </Menu.Item>
            <Menu.Item icon={<SearchOutlined />} key="discover">
              <Link to="/discover" className="nav-link">
                Discover
              </Link>
            </Menu.Item>
            <Menu.Item key="follow" icon={<TeamOutlined />}>
              <Link to="/follow" className="nav-link">
                Follow
              </Link>
            </Menu.Item>
            <Menu.Item icon={<PoweroffOutlined />} onClick={onLogout}>
              <Link onClick={onLogout} to="/" className="nav-link">
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
          </Header>
          <Content className="layout-background">{props.children}</Content>
        </Layout>
      </Layout>
    </div>
  );
};

export default Wrapper;
