import React, { Component } from "react";
import LeaderLine from "leader-line";
import { dom } from "@fortawesome/fontawesome-svg-core";
import CitizenInfoPanel from "./CitizenInfoPanel";
import Api from "../libs/api";

class Citizens extends Component {
  constructor(props) {
    super(props);
    this.state = {
      locations: {},
      location: null,
      locationQuestions: null,
      curStage: null,
    };
    this.handleLocationSelect = this.handleLocationSelect.bind(this);
    this.handleIconClick = this.handleIconClick.bind(this);
  }

  handleLocationSelect(location) {
    // update current selected location
    this.setState({
      location: location,
    });
    // fetch questions for this location
    Api.getLocationQuestions(location.id).then((resp) => {
      this.setState({
        locationQuestions: resp,
      });
    });
  }

  handleIconClick(category) {
    this.setState({
      curStage: category,
    });
  }

  componentDidMount() {
    // load available locations
    Api.getLocations().then((resp) => {
      const locationsByState = {};
      for (let loc of resp) {
        if (locationsByState[loc.state]) {
          locationsByState[loc.state].push(loc);
        } else {
          locationsByState[loc.state] = [loc];
        }
      }
      this.setState({
        locations: locationsByState,
      });
    });
    // draw leader lines between icons
    dom.i2svg().then(() => {
      // given a flow chat element returns the underlying circle element SVG
      const getCircle = (element) =>
        element.children[0].children[0].children[0];
      const leaderLineConfig = { color: "#337ab7" };
      const lines = [
        ["pre-complaintIcon", "complaintIcon"],
        ["complaintIcon", "reviewIcon"],
        ["reviewIcon", "investigationIcon"],
        ["investigationIcon", "resultIcon"],
      ];
      for (let line of lines) {
        new LeaderLine(
          getCircle(document.getElementById(line[0])),
          getCircle(document.getElementById(line[1])),
          leaderLineConfig
        );
      }
    });
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="dropdown text-center">
          <button
            className="btn btn-default dropdown-toggle"
            type="button"
            id="dropdownMenu1"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="true"
            style={{ margin: "10px auto" }}
          >
            Choose a state&nbsp;&nbsp;
            <span className="caret"></span>
          </button>
          <ul
            className="dropdown-menu multi-level"
            aria-labelledby="dropdownMenu1"
            style={{
              margin: "10px auto",
              width: "200px",
              left: "50%",
              marginLeft: "-100px",
            }}
          >
            {Object.entries(this.state.locations).map(([state, cities]) => (
              <li key={state} className="dropdown-submenu">
                <a href="#">{state}</a>
                <ul className="dropdown-menu">
                  {cities.map((city) => (
                    <li key={city.id}>
                      <a
                        tabIndex="-1"
                        onClick={() => this.handleLocationSelect(city)}
                      >
                        {city.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
        <div className="jumbotron">
          <h1>{this.state.location && this.state.location.name}</h1>
          <p className="lead">
            This tool highlights the phases involved in the process of filing a
            police complaint. Click on a circle to learn more about that
            particular phase. Disclaimer: All the information presented with
            this tool was found on the OMI and CPRB websites.
          </p>
        </div>
        <div className="row">
          <div className="col-md-2 col-md-offset-1 mb-5">
            <div className="row">
              <div
                className="text-center flow-stage col-xs-6 col-lg-12"
                id="pre-complaintIcon"
                onClick={() => this.handleIconClick("precomplaint")}
              >
                <span className="fa-stack fa-5x">
                  <i
                    id="pre-complaintCircle"
                    className="fas fa-circle fa-stack-2x flow-circle"
                  ></i>
                  <i className="fas fa-users fa-stack-1x fa-inverse"></i>
                </span>
              </div>
              <h2 className="text-center flow-stage-text col-xs-6 col-lg-12">
                Interaction
              </h2>
            </div>
          </div>
          <div className="col-md-2 mb-5">
            <div className="row">
              <div
                className="text-center flow-stage col-xs-6 col-lg-12"
                id="complaintIcon"
                onClick={() => this.handleIconClick("complaint")}
              >
                <span className="fa-stack fa-5x">
                  <i
                    id="complaintCircle"
                    className="fas fa-circle fa-stack-2x flow-circle"
                  ></i>
                  <i className="fas fa-exclamation-circle fa-stack-1x fa-inverse"></i>
                </span>
              </div>
              <h2 className="text-center flow-stage-text col-xs-6 col-lg-12">
                Complaint
              </h2>
            </div>
          </div>
          <div className="col-md-2 mb-5">
            <div className="row">
              <div
                className="text-center flow-stage col-xs-6 col-lg-12"
                id="reviewIcon"
                onClick={() => this.handleIconClick("review")}
              >
                <span className="fa-stack fa-5x">
                  <i
                    id="reviewCircle"
                    className="fas fa-circle fa-stack-2x flow-circle"
                  ></i>
                  <i className="fas fa-edit fa-stack-1x fa-inverse"></i>
                </span>
              </div>
              <h2 className="text-center flow-stage-text col-xs-6 col-lg-12">
                Review
              </h2>
            </div>
          </div>
          <div className="col-md-2 mb-5">
            <div className="row">
              <div
                className="text-center flow-stage col-xs-6 col-lg-12"
                id="investigationIcon"
                onClick={() => this.handleIconClick("investigation")}
              >
                <span className="fa-stack fa-5x">
                  <i
                    id="investigationCircle"
                    className="fas fa-circle fa-stack-2x flow-circle"
                  ></i>
                  <i className="fas fa-search fa-stack-1x fa-inverse"></i>
                </span>
              </div>
              <h2 className="text-center flow-stage-text col-xs-6 col-lg-12">
                Investigation
              </h2>
            </div>
          </div>
          <div className="col-md-2 mb-5">
            <div className="row">
              <div
                className="text-center flow-stage col-xs-6 col-lg-12"
                id="resultIcon"
                onClick={() => this.handleIconClick("result")}
              >
                <span className="fa-stack fa-5x">
                  <i
                    id="resultCircle"
                    className="fas fa-circle fa-stack-2x flow-circle"
                  ></i>
                  <i className="fas fa-check fa-stack-1x fa-inverse"></i>
                </span>
              </div>
              <h2 className="text-center flow-stage-text col-xs-6 col-lg-12">
                Result
              </h2>
            </div>
          </div>
        </div>
        <div className="row">
          {this.state.curStage && (
            <CitizenInfoPanel stage={this.state.curStage} />
          )}
        </div>
      </div>
    );
  }
}
export default Citizens;
