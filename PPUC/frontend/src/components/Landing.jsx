import React, { Component } from "react";
import { Link } from "react-router-dom";
import routes from "../routes";

class Landing extends Component {
  render() {
    return (
      <div>
        <div
          className="jumbotron"
          style={{
            backgroundImage: "url(https://i.imgur.com/jj0eBl5.jpg)",
            backgroundSize: "100%",
            paddingTop: "60px",
            paddingBottom: "90px",
          }}
        >
          <img
            src="/static/app/img/CAASI2.png"
            style={{ width: "55px", paddingBottom: "14px", opacity: 0.9 }}
          />
          <h1 style={{ color: "white" }}>
            P<span style={{ fontWeight: "bolder", opacity: 0.5 }}>x</span>PUC
          </h1>
          <hr className="my-4" style={{ borderTop: "1px solid white" }} />
          <p className="lead" style={{ color: "white" }}>
            Project{" "}
            <span style={{ fontWeight: "bolder", opacity: 0.5 }}>x</span> Police
            Union Contracts
          </p>
        </div>
        <div
          className="jumbotron"
          style={{ backgroundColor: "white", paddingTop: "20px" }}
        >
          <h2>What does our tool do?</h2>
          <p className="lead">
            Our tool allows researchers to explore police union contracts more
            easily for information, and helps citizens to find resources near
            them and learn more about the process of filing a misconduct
            complaint.
          </p>
          <Link
            className="btn btn-default float-right"
            to={routes.about}
            role="button"
          >
            Learn more
          </Link>
        </div>

        <hr className="my-4" />

        <div
          className="jumbotron"
          style={{ backgroundColor: "white", paddingTop: "20px" }}
        >
          <h2>How can it help?</h2>
          <p className="lead">
            With a more widespread understanding of these police union
            contracts, we can help break down the barriers they pose to holding
            police offers accountable for misconduct and misconduct
            investigation processes. This can help those considering filing a
            police misconduct complaint understand more about how the process
            works and what it means for them if they choose to do so.
          </p>
          <Link
            className="btn btn-default float-right"
            to={routes.about}
            role="button"
          >
            Learn more
          </Link>
        </div>

        <div className="jumbotron">
          <h2>
            <Link to={routes.researchers}>
              Researchers: search and compare police union contracts
            </Link>
          </h2>
          <p className="lead">
            Search our database of police contracts by keyword or by city.
          </p>
        </div>

        <div className="jumbotron">
          <h2>
            <Link to={routes.citizens}>
              Citizens: learn about the process of filing a misconduct complaint
            </Link>
          </h2>
          <p className="lead">
            Learn about the stages of filing a complaint and find links to
            resources for your city.
          </p>
        </div>
      </div>
    );
  }
}
export default Landing;
