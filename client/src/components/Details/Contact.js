import React, { useState, useEffect } from "react";
import { Button } from "antd";
import {
  InstagramOutlined,
  TwitterOutlined,
  FacebookOutlined,
  LinkedinOutlined,
  GithubOutlined,
  WhatsAppOutlined,
  DribbbleOutlined,
} from "@ant-design/icons";

const Footer = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [Message, setMessage] = useState("");

  const messageHandler = (e) => {
    setMessage(e.target.value);
  };

  const clickHandler = () => {
    Message.replace(" ", "%20");
  };

  return (
    <div>
      <h2>Contact</h2>
        <div flush>
          <div color="info">
            <div>Phone</div>
            <div>+234 810 8745 769</div>
          </div>
          <div color="info">
            <div>Email</div>
            <div>oloyedewaris@gmail.com</div>
            <div>
              oloyedewaristemitope@gmail.com
            </div>
          </div>
          <div color="info">
            <div>Address</div>
            <div>
              Isawo Road, Ikorodu Lagos Nigeria
            </div>
          </div>
        </div>
        <h5 style={{ margin: "10px" }}>GET IN TOUCH </h5>
        <a
          href="https://www.instagram.com//temi_topzee"
          target="_blank"
          rel="noopener noreferrer"
        >
          <InstagramOutlined
            style={{ color: "black", margin: "10px", fontSize: "1.5rem" }}
          />
        </a>
        <a
          href="https://mobile.twitter.com/waris_oloyede"
          target="_blank"
          rel="noopener noreferrer"
        >
          <TwitterOutlined
            style={{ color: "black", margin: "10px", fontSize: "1.5rem" }}
          />
        </a>
        <a
          href="https://www.facebook.com/waris.oloyede.5"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FacebookOutlined
            style={{ color: "black", margin: "10px", fontSize: "1.5rem" }}
          />
        </a>
        <a
          href="https://www.linkedin.com/in/waris-oloyede-26482319b"
          target="_blank"
          rel="noopener noreferrer"
        >
          <LinkedinOutlined
            style={{ color: "black", margin: "10px", fontSize: "1.5rem" }}
          />
        </a>
        <a href="https://github.com/oloyedewaris">
          <GithubOutlined
            style={{ color: "black", margin: "10px", fontSize: "1.5rem" }}
          />
        </a>
        <a href="https://wa.me/2348108745769?text=Hello+Waris">
          <WhatsAppOutlined
            style={{ color: "black", margin: "10px", fontSize: "1.5rem" }}
          />
        </a>
        <a href="https://dribbble.com/Topzee">
          <DribbbleOutlined
            style={{ color: "black", margin: "10px", fontSize: "1.5rem" }}
          />
        </a>
        <div>
          <p>You can also message me here on Whatsapp</p>
          <area
            type=""
            onChange={messageHandler}
            placeholder="Enter Your Message"
          />{" "}
          <br />
          <Button onClick={clickHandler}>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={`https://wa.me/2348108745769?=${Message}`}
            >
              Send
            </a>
          </Button>
        </div>
    </div>
  );
};

export default Footer;
