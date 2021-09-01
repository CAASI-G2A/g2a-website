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
      location: null,
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

  getLocationGlossary() {
    Api.getLocationGlossary(this.state.location.id).then((resp) => {
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
          <button
            className="btn btn-secondary dropdown-toggle"
            type="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
            style={{ margin: "10px auto" }}
          >
            Choose a state
            <span className="caret"></span>
          </button>
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
        <div className="jumbotron">
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
          {/* {this.state.locationSubStages["review"] &&
            this.state.locationSubStages["review"].map((subStage) => (
              <div key={subStage.id} className="col-md-2 d-lg-none">
                <div className="row">
                  <div className="text-center flow-stage col-6 col-lg-12">
                    {!subStage.faq && (
                      <FontAwesomeIcon
                        className="fa-3x flow-circle"
                        icon={faCircle}
                      />
                    )}
                    {subStage.faq && (
                      <a
                        data-toggle="collapse"
                        data-target={`#collapseSub${subStage.id}`}
                        aria-expanded="false"
                        aria-controls={`collapseSub${subStage.id}`}
                      >
                        <FontAwesomeIcon
                          className="fa-3x flow-circle"
                          icon={faCircle}
                        />
                        <span className="fa-stack fa-xs mr-n4 ml-n1 mb-4">
                          <FontAwesomeIcon
                            className="fa-stack-2x flow-circle w-100"
                            icon={faCircle}
                          />
                          <FontAwesomeIcon
                            className="fa-stack-1x fa-inverse"
                            icon={faEllipsisH}
                            data-fa-transform="shrink-10 up-2"
                          />
                        </span>
                      </a>
                    )}
                    <br />
                    <FontAwesomeIcon
                      className="fa-3x fa-w-16 flow-circle"
                      icon={faArrowDown}
                    />
                  </div>
                  <span
                    className="flow-stage-text col-6 col-lg-12"
                    dangerouslySetInnerHTML={{ __html: subStage.html }}
                  ></span>
                </div>
                {subStage.faq && (
                  <div
                    className="row collapse"
                    id={`collapseSub${subStage.id}`}
                  >
                    <div className="col-md-12 card card-body">
                      {subStage.faq.text}
                    </div>
                  </div>
                )}
              </div>
            ))} */}
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
        {/* {this.state.locationSubStages[this.state.curStage] && (
          <div className="row d-none d-lg-block">
            <h3 className="text-capitalize">{this.state.curStage}</h3>
            {this.state.locationSubStages[this.state.curStage].map(
              (subStage, index) => (
                <div key={subStage.id}>
                  <div className="row no-gutters">
                    <div
                      className={`pl-3 col-md-auto d-flex align-items-center ${
                        index === 0 ? "pt-2" : ""
                      }`}
                    >
                      <div>
                        <FontAwesomeIcon
                          className="flow-circle fa-3x"
                          icon={faCircle}
                        />
                      </div>
                    </div>
                    {subStage.faq && (
                      <div className="col-md-auto d-flex align-items-start ml-n2 mt-n2 subprocess-faq-icon">
                        <a
                          data-toggle="collapse"
                          data-target={`#collapseSub${subStage.id}`}
                          aria-expanded="false"
                          aria-controls={`collapseSub${subStage.id}`}
                        >
                          <span className="fa-stack fa-xs">
                            <FontAwesomeIcon
                              className="fa-stack-2x flow-circle w-100"
                              icon={faCircle}
                            />
                            <FontAwesomeIcon
                              className="fa-stack-1x fa-inverse"
                              icon={faEllipsisH}
                            />
                          </span>
                        </a>
                      </div>
                    )}
                    <div
                      className={`col-md d-flex align-items-center ${
                        subStage.faq ? "subprocess-ml-n" : ""
                      }`}
                    >
                      <h4
                        dangerouslySetInnerHTML={{ __html: subStage.html }}
                      ></h4>
                    </div>
                  </div>
                  {subStage.alternates && (
                    <div className="row no-gutters">
                      {subStage.alternates.map((altSubStage) => (
                        <div key={altSubStage.id} className="row no-gutters">
                          <div
                            className="col-md-auto d-flex align-items-center"
                            style={{ paddingLeft: "1.9rem" }}
                          >
                            <span
                              className="flow-circle fa-3x mt-n3"
                              style={{ fontWeight: "800" }}
                            >
                              |
                            </span>
                            <FontAwesomeIcon
                              className="fa-3x fa-w-16 flow-circle"
                              icon={faArrowRight}
                              style={{ marginLeft: "-.75rem" }}
                            />
                          </div>
                          <div className="col-md-auto d-flex align-items-center">
                            <div id={`sub${altSubStage.id}`}>
                              <FontAwesomeIcon
                                className="flow-circle fa-3x"
                                icon={faCircle}
                              />
                            </div>
                          </div>
                          <div className="col-md d-flex align-items-center">
                            <h4>{altSubStage.text}</h4>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  <div
                    className={`row no-gutters ${
                      subStage.alternates ? "mt-n3" : ""
                    }`}
                  >
                    <div className="pl-3 col-md-auto d-flex align-items-center">
                      <FontAwesomeIcon
                        className="fa-3x fa-w-16 flow-circle"
                        icon={faArrowDown}
                      />
                    </div>
                  </div>
                  {subStage.faq && (
                    <div
                      className="row collapse"
                      id={`collapseSub${subStage.id}`}
                    >
                      <div className="col-md-12 card card-body">
                        {subStage.faq.text}
                      </div>
                    </div>
                  )}
                </div>
              )
            )}
            <div className="row no-gutters">
              <div className="col-md-auto d-flex align-items-center">
                <div>
                  <FontAwesomeIcon
                    className="flow-circle fa-5x"
                    icon={faCircle}
                  />
                </div>
              </div>
              <div className="col-md d-flex align-items-center">
                <h2 className="text-capitalize">
                  {
                    this.state.stageOrder[
                      this.state.stageOrder.indexOf(this.state.curStage) + 1
                    ]
                  }
                </h2>
              </div>
            </div>
          </div>
        )} */}
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
