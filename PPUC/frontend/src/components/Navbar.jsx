import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import routes from "../routes";

class Navbar extends Component {
  render() {
    return (
      <div className="navbar navbar-custom navbar-fixed-top">
        <div className="container">
          <div className="navbar-header">
            <button
              type="button"
              className="navbar-toggle"
              data-toggle="collapse"
              data-target=".navbar-collapse"
            >
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <NavLink
              to={routes.home}
              className="navbar-brand"
              style={{ fontWeight: "bold" }}
            >
              P<span style={{ fontWeight: "bolder", opacity: 0.65 }}>x</span>PUC
            </NavLink>
          </div>
          <div className="navbar-collapse collapse">
            <ul className="nav navbar-nav">
              <li>
                <NavLink to={routes.researchers}>Researchers</NavLink>
              </li>
              <li>
                <NavLink to={routes.citizens}>Citizens</NavLink>
              </li>
              <li>
                <NavLink to={routes.about}>About</NavLink>
              </li>
              <li>
                <NavLink to={routes.contact}>Contact Us</NavLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}
export default Navbar;
