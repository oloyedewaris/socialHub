import React from "react";
import { Menu } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../../redux/actions/authActions";

const RightMenu = ({ mode, onClose }) => {
  const isAuth = useSelector(state => state.auth.isAuthenticated);

  const dispatch = useDispatch();

  const onLogout = () => {
    dispatch(logout());
  };

  return (
    <div>
      {isAuth ? (
        <Menu mode={mode}>
          <Menu.Item key="mail">
            <Link onClick={onLogout} to="/">
              Logout
            </Link>
          </Menu.Item>
        </Menu>
      ) : (
        <Menu mode={mode}>
          <Menu.Item key="mail">
            <Link to="/" onClick={onClose}>
              Signin
            </Link>
          </Menu.Item>
          <Menu.Item key="app">
            <Link to="/register" onClick={onClose}>
              Signup
            </Link>
          </Menu.Item>
        </Menu>
      )}
    </div>
  );
};

export default RightMenu;
