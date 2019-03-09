import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import NavMenuIcon from "./common/navMenuIcon";
import MovieIcon from "./common/movieIcon";
import "../App.css";

class NavBar extends Component {
  navMenuCollapser() {
    let checkIt = document.getElementById("Navbar__show-menu").click();
    return checkIt;
  }

  render() {
    return (
      <div className="Navbar__container">
        <Link to="/">
          <p className="Navbar__logo">
            <MovieIcon />
            MEDIALENDER
          </p>
        </Link>
        <label htmlFor="Navbar__show-menu" className="Navbar__show-menu">
          <div className="Navbar__Icon">
            <NavMenuIcon />
          </div>
        </label>
        <input type="checkbox" id="Navbar__show-menu" role="button" />
        <ul className="Navbar">
          <li className="Navbar__item">
            <NavLink
              className="Navbar__link"
              to="/movies"
              onClick={this.navMenuCollapser}
            >
              Movies
            </NavLink>
          </li>
          {this.props.user && this.props.user.isAdmin && (
            <React.Fragment>
              <li className="Navbar__item">
                <NavLink
                  className="Navbar__link"
                  to="/customers"
                  onClick={this.navMenuCollapser}
                >
                  Customers
                </NavLink>
              </li>
              <li className="Navbar__item">
                <NavLink
                  className="Navbar__link"
                  to="/rentals"
                  onClick={this.navMenuCollapser}
                >
                  Rentals
                </NavLink>
              </li>
              <li className="Navbar__item">
                <NavLink
                  className="Navbar__link"
                  to="/users"
                  onClick={this.navMenuCollapser}
                >
                  Editors
                </NavLink>
              </li>
            </React.Fragment>
          )}
          {!this.props.user && (
            <React.Fragment>
              <li className="Navbar__item">
                <NavLink
                  className="Navbar__link"
                  to="/login"
                  onClick={this.navMenuCollapser}
                >
                  Login
                </NavLink>
              </li>
              <li className="Navbar__item">
                <NavLink
                  className="Navbar__link"
                  to="/register"
                  onClick={this.navMenuCollapser}
                >
                  Become an Editor
                </NavLink>
              </li>
              <li className="Navbar__item">
                <NavLink
                  className="Navbar__link"
                  to="/registercustomer"
                  onClick={this.navMenuCollapser}
                >
                  Become a Customer
                </NavLink>
              </li>
            </React.Fragment>
          )}
          {this.props.user && (
            <React.Fragment>
              <li className="Navbar__item">
                <NavLink
                  className="Navbar__link"
                  to="/profile"
                  onClick={this.navMenuCollapser}
                >
                  <b>User: {this.props.user.name}</b>
                </NavLink>
              </li>
              <li className="Navbar__item">
                <NavLink
                  className="Navbar__link"
                  to="/logout"
                  onClick={this.navMenuCollapser}
                >
                  Logout
                </NavLink>
              </li>
            </React.Fragment>
          )}
        </ul>
      </div>
    );
  }
}

export default NavBar;
