import React from "react";
import { Link } from "react-router-dom";
import Logo from "./logo.png";

const Header = ({
  handleHeaderLinkClick,
  searchInput,
  handleChange,
  handleSubmit,
  icon,
  handleResponse,
}) => {
  return (
    <header className="headerContainer">
      <img src={Logo} alt="logo" className="logo" />
      <section className="headerLink" onClick={handleHeaderLinkClick}>
        <img
          src={icon}
          alt=""
          onClick={handleResponse}
          className="headerToggle"
        />
        <Link to="/" className="newsLink">
          News
        </Link>
        <Link to="news/weather" className="weatherLink">
          Weather
        </Link>

        <form onSubmit={handleSubmit} className="form">
          <input
            type="text"
            className="input"
            name={searchInput.searchInput.inputName}
            value={searchInput.searchInput.inputName}
            onChange={handleChange}
          />
          <button onClick={handleSubmit}>Search</button>
        </form>
      </section>
    </header>
  );
};

export default Header;
