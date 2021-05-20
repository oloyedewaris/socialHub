import React, { useEffect } from "react";
import {
  Row,
  Col
} from "antd";
import waris from "../../assets/waris.jpg";

function About() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={{ margin: "20px" }}>
      <h1 style={{ margin: "20px", marginTop: "0" }} className="center">
        About Me
      </h1>
      <Row>
        <Col
          style={{
            display: "flex",
            justifyContent: "center",
          }}
          xs="12"
          sm="10"
          md="3"
          lg="3"
        >
          <img
            className="rounded-circle"
            style={{
              width: "30vh",
              height: "30vh",
              margin: "15px",
            }}
            src={waris}
            alt="waris"
          />
        </Col>
        <Col xs="12" sm="12" md="9" lg="9">
          <div style={{ margin: "auto 15px" }}>
            <div body>
              <div
                style={{ width: "90%", Align: "center", margin: "10px" }}
                heading
              >
                I AM WARIS OLOYEDE
              </div>
              I am Waris Oloyede, an Undergraduate Computer Science student of
              OAU Ile-Ife. I am a mern-stack developer, I build websites and web
              applications using React, Express, Node and MongoDB.
              <div flush style={{ marginTop: "7px" }}>
                <h3>My Services</h3>
                <div active>
                  <div>
                    Responsive Websites
                  </div>
                  <div>
                    I build responsive and pixel perfect websites for desktop,
                    tablets and mobile devices
                  </div>
                </div>
                <div active>
                  <div>Web Applications</div>
                  <div>
                    I build great web apps with React, Redux and some third
                    party libraries
                  </div>
                </div>
                <div active>
                  <div>Restful APIs</div>
                  <div>
                    I build restful APIs which will be used by front-end
                    engineers with the help of Node, Express and mongoDB
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default About;
