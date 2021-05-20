import React from "react";
import {
  InstagramOutlined,
  TwitterOutlined,
  FacebookOutlined,
  LinkedinOutlined,
  GithubOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div
      style={{
        width: "100%",
        maxHeight: "120px",
        marginTop: "12vh",
        backgroundColor: "#343A40",
        color: "#fff",
      }}
      className="f-bottom center"
    >
      <p style={{ padding: "4px", color: "#ccc7cc" }}>
        <Link to="/contact" style={{ color: "#80bdff", margin: "5px" }}>
          Contact Me
        </Link>
        <Link to="/about" style={{ color: "#80bdff", margin: "5px" }}>
          About Me
        </Link>
      </p>

      <p>
        <a
          href="https://www.instagram.com//temi_topzee"
          target="_blank"
          rel="noopener noreferrer"
        >
          <InstagramOutlined
            style={{
              color: "#80bdff",
              margin: "5px",
              fontSize: "1.5rem",
            }}
          />
        </a>
        <a
          href="https://mobile.twitter.com/waris_oloyede"
          target="_blank"
          rel="noopener noreferrer"
        >
          <TwitterOutlined
            style={{
              color: "#80bdff",
              margin: "5px",
              fontSize: "1.5rem",
            }}
          />
        </a>
        <a
          href="https://www.facebook.com/waris.oloyede.5"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FacebookOutlined
            style={{
              color: "#80bdff",
              margin: "5px",
              fontSize: "1.5rem",
            }}
          />
        </a>
        <a
          href="https://www.linkedin.com/in/waris-oloyede-26482319b"
          target="_blank"
          rel="noopener noreferrer"
        >
          <LinkedinOutlined
            style={{
              color: "#80bdff",
              margin: "5px",
              fontSize: "1.5rem",
            }}
          />
        </a>
        <a href="https://github.com/oloyedewaris">
          <GithubOutlined
            style={{
              color: "#80bdff",
              margin: "5px",
              fontSize: "1.5rem",
            }}
          />
        </a>
      </p>
      <p>
        Created by{" "}
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
