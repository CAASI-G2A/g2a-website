// import bootstrap
import "bootstrap";

// import site styles
import "../scss/app.scss";

import React, { Component } from "react";
import { render } from "react-dom";
import { HashRouter, Switch, Route } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp } from "@fortawesome/free-solid-svg-icons";
import routes from "../routes";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Landing from "./Landing";
import Researchers from "./Researchers";
import Citizens from "./Citizens";
import About from "./About";
import Contact from "./Contact";
import Location from "./Location";
import Map from "./policeDeptMap/MapContainer";
import Commentary from "./Commentary";

class App extends Component {
  componentDidMount() {
    // scroll to top button
    $(document).ready(function () {
      $(window).scroll(function () {
        if ($(this).scrollTop() > 50) {
          $("#back-to-top").fadeIn();
        } else {
          $("#back-to-top").fadeOut();
        }
      });
      // scroll body to 0px on click
      $("#back-to-top").click(() => {
        $("body,html").animate(
          {
            scrollTop: 0,
          },
          400
        );
        return false;
      });
    });
  }

  render() {
    return (
      <HashRouter>
        <Navbar />
        <div className="container body-content">
          {/* handle routes */}
          <Switch>
            <Route path={routes.home} exact component={Landing} />
            <Route path={routes.map} exact component={Map} />
            <Route path={routes.commentary} component={Commentary} />
            <Route path={routes.researchers} component={Researchers} />
            <Route path={routes.citizens + "/:lid?"} component={Citizens} />
            <Route path={routes.about} component={About} />
            <Route path={routes.contact} component={Contact} />
            <Route path={routes.location + "/:lid"} component={Location} />
          </Switch>
          <a
            id="back-to-top"
            href="#"
            className="btn btn-light btn-lg back-to-top"
            role="button"
          >
            <FontAwesomeIcon icon={faChevronUp} />
          </a>
          <hr />
          <Footer />
        </div>
      </HashRouter>
    );
  }
}

export default App;
const container = document.getElementById("app");
if (container) {
  render(<App />, container);
}
