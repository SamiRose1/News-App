import React from "react";

const Header = () => {
  return (
    <header className="headerContainer">
      <img src="logo" alt="logo" />
      <section className="headerLink">
        Weather
        <input type="text" />
        <p>Search</p>
      </section>
    </header>
  );
};

export default Header;
