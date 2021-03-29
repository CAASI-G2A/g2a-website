import React, { Component } from "react";
import LeaderLine from "leader-line";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircle,
  faUsers,
  faEdit,
  faSearch,
  faExclamationCircle,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import * as scrollToElement from "scroll-to-element";
import CitizenInfoPanel from "./CitizenInfoPanel";
import Api from "../libs/api";
import { useParams } from "react-router-dom";

class Citizens extends Component {
  constructor(props) {
    super(props);
    this.state = {
      locations: {},
      location: null,
      locationQuestions: null,
      locationStages: null,
      curStage: null,
      leaderLines: [],
    };
    this.drawLeaderLines = this.drawLeaderLines.bind(this);
    this.getLocationQuestions = this.getLocationQuestions.bind(this);
    this.getLocationStages = this.getLocationStages.bind(this);
    this.handleLocationSelect = this.handleLocationSelect.bind(this);
    this.handleIconClick = this.handleIconClick.bind(this);
  }

  drawLeaderLines() {
    // given a flow chat element returns the underlying circle element SVG
    const getCircle = (element) => element.children[0].children[0].children[0];
    const leaderLineConfig = { color: "#337ab7" };
    const lines = [
      ["pre-complaintIcon", "complaintIcon"],
      ["complaintIcon", "reviewIcon"],
      ["reviewIcon", "investigationIcon"],
      ["investigationIcon", "resultIcon"],
    ];
    const leaderLines = [];
    for (let line of lines) {
      leaderLines.push(
        new LeaderLine(
          getCircle(document.getElementById(line[0])),
          getCircle(document.getElementById(line[1])),
          leaderLineConfig
        )
      );
    }
    this.setState({
      leaderLines: leaderLines,
    });
  }

  getLocationQuestions() {
    Api.getLocationQuestions(this.state.location.id).then((resp) => {
      const questionsByCat = {};
      for (let category of resp) {
        questionsByCat[category.name.toLowerCase()] = category.questions;
      }
      this.setState({
        locationQuestions: questionsByCat,
      });
    });
  }

  getLocationStages() {
    Api.getLocationStages(this.state.location.id).then((resp) => {
      this.setState({
        locationStages: resp,
      });
    });
  }

  handleLocationSelect(location) {
    // update current selected location
    this.setState(
      {
        location: location,
      },
      () => {
        this.getLocationQuestions();
        this.getLocationStages();
      }
    );
  }

  handleIconClick(category) {
    this.setState(
      {
        curStage: category,
      },
      () => scrollToElement("#citizenInfoPanel")
    );
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
      // check if preset location
      const { lid } = this.props.match.params;
      let location = null;
      // if set try to find it
      if (lid) {
        location = resp.find((loc) => loc.id == lid);
      } else {
        // default to Pittsburgh
        location = resp.find((loc) => loc.name == "Pittsburgh");
      }
      this.setState(
        {
          locations: locationsByState,
          location: location,
        },
        () => {
          this.drawLeaderLines();
          this.getLocationQuestions();
          this.getLocationStages();
        }
      );
    });
  }

  componentWillUnmount() {
    // remove leader lines
    for (let leaderLine of this.state.leaderLines) {
      leaderLine.remove();
    }
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
                onClick={() => this.handleIconClick("pre-complaint")}
              >
                <span className="fa-stack fa-5x">
                  <FontAwesomeIcon
                    id="pre-complaintCircle"
                    className={`fa-stack-2x flow-circle ${
                      this.state.curStage == "pre-complaint"
                        ? "flow-circle-selected"
                        : ""
                    }`}
                    icon={faCircle}
                  />
                  <FontAwesomeIcon
                    className="fa-stack-1x fa-inverse"
                    icon={faUsers}
                  />
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
                  <FontAwesomeIcon
                    id="complaintCircle"
                    className={`fa-stack-2x flow-circle ${
                      this.state.curStage == "complaint"
                        ? "flow-circle-selected"
                        : ""
                    }`}
                    icon={faCircle}
                  />
                  <FontAwesomeIcon
                    className="fa-stack-1x fa-inverse"
                    icon={faExclamationCircle}
                  />
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
                  <FontAwesomeIcon
                    id="reviewCircle"
                    className={`fa-stack-2x flow-circle ${
                      this.state.curStage == "review"
                        ? "flow-circle-selected"
                        : ""
                    }`}
                    icon={faCircle}
                  />
                  <FontAwesomeIcon
                    className="fa-stack-1x fa-inverse"
                    icon={faEdit}
                  />
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
                  <FontAwesomeIcon
                    id="investigationCircle"
                    className={`fa-stack-2x flow-circle ${
                      this.state.curStage == "investigation"
                        ? "flow-circle-selected"
                        : ""
                    }`}
                    icon={faCircle}
                  />
                  <FontAwesomeIcon
                    className="fa-stack-1x fa-inverse"
                    icon={faSearch}
                  />
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
                  <FontAwesomeIcon
                    id="resultCircle"
                    className={`fa-stack-2x flow-circle ${
                      this.state.curStage == "result"
                        ? "flow-circle-selected"
                        : ""
                    }`}
                    icon={faCircle}
                  />
                  <FontAwesomeIcon
                    className="fa-stack-1x fa-inverse"
                    icon={faCheck}
                  />
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
            <CitizenInfoPanel
              id="citizenInfoPanel"
              stage={this.state.locationStages[this.state.curStage]}
              questions={this.state.locationQuestions[this.state.curStage]}
            />
          )}
        </div>
      </div>
    );
  }
}
export default Citizens;
