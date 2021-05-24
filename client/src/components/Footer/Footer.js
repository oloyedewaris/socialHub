import React from "react";
import {
  InstagramOutlined,
  TwitterOutlined,
  FacebookOutlined,
  LinkedinOutlined,
  GithubOutlined
} from "@ant-design/icons";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div>
      <p className="about-contact">
        <Link to="/contact" className="me">
          Contact Me
        </Link>
        <Link to="/about" className="me">
          About Me
        </Link>
      </p>

      <p>
        <a
          href="https://www.instagram.com//temi_topzee"
          target="_blank"
          rel="noopener noreferrer"
        >
          <InstagramOutlined className="footer-font" />
        </a>
        <a
          href="https://mobile.twitter.com/waris_oloyede"
          target="_blank"
          rel="noopener noreferrer"
        >
          <TwitterOutlined className="footer-font" />
        </a>
        <a
          href="https://www.facebook.com/waris.oloyede.5"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FacebookOutlined className="footer-font" />
        </a>
        <a
          href="https://www.linkedin.com/in/waris-oloyede-26482319b"
          target="_blank"
          rel="noopener noreferrer"
        >
          <LinkedinOutlined className="footer-font" />
        </a>
        <a href="https://github.com/oloyedewaris">
          <GithubOutlined className="footer-font" />
        </a>
      </p>
      <p>
        Developed by{" "}
        <a
          style={{ color: "#80bdff" }}
          href="https://waris-portfolio.herokuapp.com"
        >
          Waris
        </a>
        . Copyright © {new Date().getFullYear()}
      </p>
    </div>
  );
}

export default Footer;
