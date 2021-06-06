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
