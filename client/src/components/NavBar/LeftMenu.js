import React, { Component } from 'react';
import { Menu } from 'antd';
import {Link} from "react-router-dom";

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
class LeftMenu extends Component {
  render() {
    return (
   <Menu mode="horizontal">
       <Menu.Item key="mail">
          <Link to="/">Home</Link>
        </Menu.Item>
        <Menu.Item key="alipay">
          <Link to="/app">About</Link>
        </Menu.Item>
        <SubMenu title={<span>More</span>}>
          <MenuItemGroup title="me">
            <Menu.Item key="setting:1"><Link to="/contact">Contact</Link></Menu.Item>
            <Menu.Item key="setting:2"><Link to="/about">About</Link></Menu.Item>
          </MenuItemGroup>
          <MenuItemGroup title="more">
            <Menu.Item key="setting:3"><Link to="/portfolio">Portfolio</Link></Menu.Item>
          </MenuItemGroup>
        </SubMenu>
      </Menu>
    );
  }
}
export default LeftMenu;