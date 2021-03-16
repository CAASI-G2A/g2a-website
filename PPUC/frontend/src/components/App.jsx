// import bootstrap
import "bootstrap";
// import fontawesome icons
import "@fortawesome/fontawesome-free/js/all.js";

// import bootstrap styles
import "bootstrap/dist/css/bootstrap.min.css";
// import site styles
import "../scss/app.scss";

import React, { Component } from "react";
import { render } from "react-dom";
import { HashRouter, Switch, Route } from "react-router-dom";
import routes from "../routes";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Landing from "./Landing";
import Researchers from "./Researchers";
import Citizens from "./Citizens";
import About from "./About";
import Contact from "./Contact";
import Location from "./Location";

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
            <i className="fas fa-chevron-up"></i>
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

window.showContractSearch = () => {
  //on click set all elements to hidden and who the one we want
  document.getElementById("pre-complaintPanel").style.display = "none";
  document.getElementById("complaintPanel").style.display = "none";
  document.getElementById("reviewPanel").style.display = "none";
  document.getElementById("investigationPanel").style.display = "none";
  document.getElementById("resultPanel").style.display = "none";
  document.getElementById("contractPanel").style.display = "block";
};

window.loadModalLink = function (element, e) {
  if (e) {
    e.preventDefault();
  }
  const modalId = $(element).attr("data-target");
  const href = $(element).attr("href");
  $(modalId).modal("show").load(href);
};
