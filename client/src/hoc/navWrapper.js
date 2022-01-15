import React from "react";
import { Row, Col } from "antd";
import Profile from "../screen/Profile/LSProfile";
import Users from "../screen/Discover/RecentUsers";
import "./wrapper.css";

function Large(Component) {
  const LargeCheck = () => {
    return (
      <>
        <Row className="large_comp_con">
          <Col md={6} lg={5}>
            <Profile />
          </Col>
          <Col sm={24} md={12} lg={14}>
            <div className="comp_scroll">
              <Component />
            </div>
          </Col>
          <Col md={6} lg={5}>
            <Users />
          </Col>
        </Row>
        <div className="small_comp_con">
          <Component />
        </div>
      </>
    );
  };
  return LargeCheck;
}

export default Large;
