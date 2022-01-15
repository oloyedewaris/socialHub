import React from "react";
import { Menu, Badge } from "antd";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../../redux/actions/authActions";
import { HomeOutlined, SearchOutlined, UserOutlined, PoweroffOutlined } from "@ant-design/icons";

const MobileMenu = () => {
  const user = useSelector(state => state.auth.user)
  const dispatch = useDispatch();

  const onLogout = () => {
    dispatch(logout());
  };

  return (
    <>
      <Menu mode="horizontal">
        <Menu.Item key="home">
          <Link to="/">
            <HomeOutlined style={{ color: "black", fontSize: "17px" }} /> Home
          </Link>
        </Menu.Item>
        {user ? <>
          <Menu.Item key="profile">
            <Link to={`/profile/`}>
              <UserOutlined style={{ color: "green", fontSize: "17px" }} />
            </Link>
          </Menu.Item>
          <Menu.Item key="discover">
            <Link to="/discover">
              <SearchOutlined style={{ color: "purple", fontSize: "17px" }} />
            </Link>
          </Menu.Item>
          <Menu.Item key="logout">
            <Link onClick={onLogout}>
              <PoweroffOutlined style={{ color: "red", fontSize: "17px" }} />
            </Link>
          </Menu.Item>
        </> : <>
          <Menu.Item key="signin">
            <Link to="/login">
              Signin
            </Link>
          </Menu.Item>
          <Menu.Item key="register">
            <Link to="/register">
              Signup
            </Link>
          </Menu.Item>
        </>}
      </Menu>
    </>
  );
};

export default MobileMenu;