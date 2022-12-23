import React from "react";
import Logo from "./logo.png";

const Footer = () => {
  return (
    <div className="footer">
      <img src={Logo} alt="" className="logo" />
      <p>
        ©Copyright {new Date().getFullYear()} Seim Yemane. Don't claim as your
        own, use for your portfolio or learning purposes only.
      </p>
    </div>
  );
};

export default Footer;
