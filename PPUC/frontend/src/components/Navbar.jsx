import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import routes from "../routes";

class Navbar extends Component {
  render() {
    return (
      <div className="container">
        <div className="navbar navbar-expand-lg">
          <NavLink
            to={routes.home}
            className="navbar-brand"
            style={{ fontWeight: "bold" }}
          >
            P<span style={{ fontWeight: "bolder", opacity: 0.65 }}>x</span>PUC
          </NavLink>
          <button
            type="button"
            className="navbar-toggler navbar-light"
            data-toggle="collapse"
            data-target=".navbar-collapse"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="navbar-collapse collapse">
            <ul className="navbar-nav">
              <li className="nav-item nav-link">
                <NavLink to={routes.researchers}>Researchers</NavLink>
              </li>
              <li className="nav-item nav-link">
                <NavLink to={routes.citizens}>Citizens</NavLink>
              </li>
              <li className="nav-item nav-link">
                <NavLink to={routes.about}>About</NavLink>
              </li>
              <li className="nav-item nav-link">
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
