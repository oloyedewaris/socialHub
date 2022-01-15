import React from "react";
import { Menu } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../../../redux/actions/authActions";
import { PoweroffOutlined } from "@ant-design/icons";

const RightMenu = () => {
  const isAuth = useSelector(state => state.auth.isAuthenticated);

  const dispatch = useDispatch();

  const onLogout = () => {
    dispatch(logout());
  };

  return (
    <div>
      {isAuth ? (
        <Menu mode='horizontal'>
          <Menu.Item key="mail">
            <Link onClick={onLogout}>
              <PoweroffOutlined style={{ color: "red" }} /> Logout
            </Link>
          </Menu.Item>
        </Menu>
      ) : (
        <Menu mode='horizontal'>
          <Menu.Item key="mail">
            <Link to="/">
              Signin
            </Link>
          </Menu.Item>
          <Menu.Item key="app">
            <Link to="/register">
              Signup
            </Link>
          </Menu.Item>
        </Menu>
      )}
    </div>
  );
};

export default RightMenu;
