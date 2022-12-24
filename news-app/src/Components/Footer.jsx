import React from "react";
import Logo from "./logo.png";

const Footer = () => {
  return (
    <div className="footer">
      <img src={Logo} alt="" className="logo" />
      <p>
        {new Date().getFullYear()} ©Copyright by Seim Yemane. Use for learning
        or your portfolio. Don't use to teach. Don't claim as your own product.
      </p>
    </div>
  );
};

export default Footer;
