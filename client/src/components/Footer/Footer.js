import React from "react";

function Footer() {
  return (
    <div className="about-contact">
      <p>
        Developed by{" "}
        <a
          target="_blank"
          rel="noopener noreferrer"
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

/*import { Button, notification, Divider, Space } from 'antd';
import {
  RadiusUpleftOutlined,
  RadiusUprightOutlined,
  RadiusBottomleftOutlined,
  RadiusBottomrightOutlined,
} from '@ant-design/icons';

const openNotification = placement => {
  notification.info({
    message: `Notification ${placement}`,
    description:
      'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
    placement,
  });
};

ReactDOM.render(
  <div>
    <Space>
      <Button type="primary" onClick={() => openNotification('topLeft')}>
        <RadiusUpleftOutlined />
        topLeft
      </Button>
      <Button type="primary" onClick={() => openNotification('topRight')}>
        <RadiusUprightOutlined />
        topRight
      </Button>
    </Space>
    <Divider />
    <Space>
      <Button type="primary" onClick={() => openNotification('bottomLeft')}>
        <RadiusBottomleftOutlined />
        bottomLeft
      </Button>
      <Button type="primary" onClick={() => openNotification('bottomRight')}>
        <RadiusBottomrightOutlined />
        bottomRight
      </Button>
    </Space>
  </div>,
  mountNode,
);*/
