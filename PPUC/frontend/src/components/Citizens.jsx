import React, { Component } from "react";
import ReactDOMServer from "react-dom/server";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircle,
  faUsers,
  faEdit,
  faSearch,
  faExclamationCircle,
  faCheck,
  faQuestionCircle,
  faEllipsisH,
  faArrowDown,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import * as scrollToElement from "scroll-to-element";
import $ from "jquery";
import "bootstrap/js/dist/tooltip";
import "bootstrap/js/dist/popover";
import CitizenInfoPanel from "./CitizenInfoPanel";
import Api from "../libs/api";
import { useParams } from "react-router-dom";

class Citizens extends Component {
  constructor(props) {
    super(props);
    this.state = {
      locations: {},
      location: "Pittsburgh",
      locationQuestions: null,
      locationStages: null,
      locationGlossary: null,
      stageOrder: [
        "pre-complaint",
        "complaint",
        "review",
        "investigation",
        "result",
      ],
      curStage: null,
      locationSubStages: {
        review: [
          {
            id: 1,
            text: "DAR is filed. Copies given to officer",
            faq: {
              title: "FAQ",
              text: "FAQ TEXT",
            },
          },
          {
            id: 2,
            text: "DAR goes through the chain of command",
          },
          {
            id: 3,
            text: "DOPS holds meeting with officer",
            alternates: [
              {
                id: 4,
                text: "No discipline",
              },
            ],
          },
        ],
      },
    };
    this.getLocationQuestions = this.getLocationQuestions.bind(this);
    this.getLocationStages = this.getLocationStages.bind(this);
    this.getLocationGlossary = this.getLocationGlossary.bind(this);
    this.applyGlossary = this.applyGlossary.bind(this);
    this.handleLocationSelect = this.handleLocationSelect.bind(this);
    this.handleIconClick = this.handleIconClick.bind(this);
  }

  getLocationQuestions() {
    //Replaced ID this.state.location.id with "0"
    Api.getLocationQuestions(0).then((resp) => {
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
    //Replaced ID this.state.location.id with "0"
    Api.getLocationStages(0).then((resp) => {
      this.setState({
        locationStages: resp,
      });
    });
  }

  getLocationGlossary() {
    //Replaced ID this.state.location.id with "0"
    Api.getLocationGlossary(0).then((resp) => {
      this.setState(
        {
          locationGlossary: resp,
        },
        () => {
          this.applyGlossary();
        }
      );
    });
  }

  applyGlossary() {
    // ensure we have the terms + substages
    if (!this.state.locationGlossary || !this.state.locationSubStages) {
      return;
    }
    // go through all substages and look for terms
    const newSubStages = {};
    for (let [stageName, subStages] of Object.entries(
      this.state.locationSubStages
    )) {
      for (let subStage of subStages) {
        subStage.html = subStage.text;
        for (let term of this.state.locationGlossary) {
          const termMatches = [
            ...subStage.text.matchAll(new RegExp(`\\b${term.term}\\b`, "g")),
          ];
          // start from end of indices
          termMatches.reverse();
          for (let match of termMatches) {
            const index = match.index;
            subStage.html = `${subStage.html.substr(0, index)}<a
		      data-toggle="tooltip"
		      title=""
		      data-original-title="${term.definition}"
		    >${term.term}${ReactDOMServer.renderToString(
              <FontAwesomeIcon className="fa-xs mb-3" icon={faQuestionCircle} />
            )}
		    </a>${subStage.html.substr(index + term.term.length)}`;
          }
        }
      }
      newSubStages[stageName] = subStages;
    }
    this.setState({
      locationSubStages: newSubStages,
    });
  }

  handleLocationSelect(location) {
    // update current selected location
    // TODO: Locations no longer apply, should just set to Pittsburgh or None
    this.setState(
      {
        location: location,
      },
      () => {
        this.getLocationQuestions();
        this.getLocationStages();
        this.getLocationGlossary();
      }
    );
  }

  handleIconClick(category) {
    this.setState(
      {
        curStage: category,
      },
      () => {
        // draw leader lines
        scrollToElement("#citizenInfoPanel");
      }
    );
  }

  componentDidMount() {
    // enable all tooltips
    $('[data-toggle="tooltip"]').tooltip();
    // enable all popovers
    $('[data-toggle="popover"]').popover();
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
          this.getLocationQuestions();
          this.getLocationStages();
          this.getLocationGlossary();
        }
      );
    });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    // enable all tooltips
    $('[data-toggle="tooltip"]').tooltip();
    // enable all popovers
    $('[data-toggle="popover"]').popover();
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="dropdown text-center">
          <div className="dropdown-menu multi-level">
            {Object.entries(this.state.locations).map(([state, cities]) => (
              <li key={state} className="dropdown-submenu">
                <a className="dropdown-item">{state}</a>
                <ul className="dropdown-menu">
                  {cities.map((city) => (
                    <li key={city.id}>
                      <a
                        className="dropdown-item"
                        onClick={() => this.handleLocationSelect(city)}
                      >
                        {city.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </div>
        </div>
        <h2
          style={{
            color: "darkblue",
            fontWeight: 700,
            marginTop: "50px",
          }}
        >
          Complaint FAQ
        </h2>
        <div className="jumbotron" style={{ padding: '2rem' }}>
          <h1>{this.state.location && this.state.location.name}</h1>
          <p className="lead">
            This tool highlights the phases involved in the process of filing a
            police complaint. Click on a circle to learn more about that
            particular phase. Disclaimer: All the information presented with
            this tool was found on the OMI and CPRB websites.
          </p>
        </div>
        <div className="row no-gutters">
          <div className="col-md-2">
            <div className="row">
              <div
                className="text-center flow-stage col-6 col-lg-12"
                onClick={() => this.handleIconClick("pre-complaint")}
              >
                <span className="fa-stack fa-5x">
                  <FontAwesomeIcon
                    className={`fa-stack-2x flow-circle w-100 ${
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
              <h2 className="text-center flow-stage-text col-6 col-lg-12">
                Interaction
              </h2>
            </div>
          </div>
          <div className="col-md-auto">
            <div className="d-none d-md-block row no-gutters h-100">
              <div className="text-center flow-circle col-auto d-flex align-items-center h-75 mb-5">
                <FontAwesomeIcon className="fa-3x" icon={faArrowRight} />
              </div>
            </div>
            <div className="d-block d-md-none row h-100">
              <div className="text-center flow-circle col-auto col-6">
                <FontAwesomeIcon className="fa-3x" icon={faArrowDown} />
              </div>
            </div>
          </div>
          <div className="col-md-2">
            <div className="row">
              <div
                className="text-center flow-stage col-6 col-lg-12"
                onClick={() => this.handleIconClick("complaint")}
              >
                <span className="fa-stack fa-5x">
                  <FontAwesomeIcon
                    className={`fa-stack-2x flow-circle w-100 ${
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
              <h2 className="text-center flow-stage-text col-6 col-lg-12">
                Complaint
              </h2>
            </div>
          </div>
          <div className="col-md-auto">
            <div className="d-none d-md-block row no-gutters h-100">
              <div className="text-center flow-circle col-auto d-flex align-items-center h-75 mb-5">
                <FontAwesomeIcon className="fa-3x" icon={faArrowRight} />
              </div>
            </div>
            <div className="d-block d-md-none row h-100">
              <div className="text-center flow-circle col-auto col-6">
                <FontAwesomeIcon className="fa-3x" icon={faArrowDown} />
              </div>
            </div>
          </div>
          <div className="col-md-2">
            <div className="row">
              <div
                className="text-center flow-stage col-6 col-lg-12"
                onClick={() => this.handleIconClick("review")}
              >
                <span className="fa-stack fa-5x">
                  <FontAwesomeIcon
                    className={`fa-stack-2x flow-circle w-100 ${
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
              <h2 className="text-center flow-stage-text col-6 col-lg-12">
                Review
              </h2>
            </div>
          </div>
          <div className="col-md-auto">
            <div className="d-none d-md-block row no-gutters h-100">
              <div className="text-center flow-circle col-auto d-flex align-items-center h-75 mb-5">
                <FontAwesomeIcon className="fa-3x" icon={faArrowRight} />
              </div>
            </div>
            <div className="d-block d-md-none row h-100">
              <div className="text-center flow-circle col-auto col-6">
                <FontAwesomeIcon className="fa-3x" icon={faArrowDown} />
              </div>
            </div>
          </div>
          <div className="col-md-2">
            <div className="row">
              <div
                className="text-center flow-stage col-6 col-lg-12"
                onClick={() => this.handleIconClick("investigation")}
              >
                <span className="fa-stack fa-5x">
                  <FontAwesomeIcon
                    className={`fa-stack-2x flow-circle w-100 ${
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
              <h2 className="text-center flow-stage-text col-6 col-lg-12">
                Investigation
              </h2>
            </div>
          </div>
          <div className="col-md-auto">
            <div className="d-none d-md-block row no-gutters h-100">
              <div className="text-center flow-circle col-auto d-flex align-items-center h-75 mb-5">
                <FontAwesomeIcon className="fa-3x" icon={faArrowRight} />
              </div>
            </div>
            <div className="d-block d-md-none row h-100">
              <div className="text-center flow-circle col-auto col-6">
                <FontAwesomeIcon className="fa-3x" icon={faArrowDown} />
              </div>
            </div>
          </div>
          <div className="col-md-2">
            <div className="row">
              <div
                className="text-center flow-stage col-6 col-lg-12"
                onClick={() => this.handleIconClick("result")}
              >
                <span className="fa-stack fa-5x">
                  <FontAwesomeIcon
                    className={`fa-stack-2x flow-circle w-100 ${
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
              <h2 className="text-center flow-stage-text col-6 col-lg-12">
                Result
              </h2>
            </div>
          </div>
        </div>
        <div className="row mt-5">
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
