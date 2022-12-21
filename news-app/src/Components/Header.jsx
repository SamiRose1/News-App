import React from "react";
import { Link } from "react-router-dom";

const Header = ({
  handleHeaderLinkClick,
  searchInput,
  setSearchInput,
  handleChange,
  handleSubmit,
}) => {
  return (
    <header className="headerContainer">
      <img src="logo" alt="logo" />
      <section className="headerLink" onClick={handleHeaderLinkClick}>
        <Link to="/" className="newsLink">
          News
        </Link>
        <Link to="news/weather" className="weatherLink">
          Weather
        </Link>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="input"
            value={searchInput}
            onChange={handleChange}
          />
          <button onClick={handleSubmit}>Search</button>
        </form>
      </section>
    </header>
  );
};

export default Header;
