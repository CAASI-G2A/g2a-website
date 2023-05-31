import React, { Component } from "react";
import { useState } from "react";
//import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import { NavLink } from "react-router-dom";
import routes from "../routes";

import QueryString from "query-string";
import * as scrollToElement from "scroll-to-element";
import { Alert } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faTimes } from "@fortawesome/free-solid-svg-icons";
import Api from "../libs/api";
import SearchParser from "../libs/researcher_search_lang";
import ResearcherResult from "./ResearcherResult";
import SmallList from "./policeDeptMap/MapContainer";
import { autoType } from "d3-dsv";
import "../scss/tab.scss";

import keys from "../data/keywords.json";
// import keys2 from "../data/keywords.csv";

// TODO:
//     1. Once classes get fixed... condense code so that the same html text is not repeated over and over again, and Highlight words in setence examples
//     2. find better way to do breaks in code
//     3. make keywords look better 
//     4. make the expanding and such look better and click better
//     5. fix text 
//     6. fix formating 


class Commentary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showUnfounded: false,
      // hoveredUnfounded: false,

      showInterview: false,
      // hoveredInterview: false,

      showInterrogation: false,
      // hoveredInterrogation: false,

      showFalseArrest: false,
      // hoveredFalseArrest: false,

      showReprimand: false,
      // hoveredReprimand: false,

      showPublicComment: false,
      // hoveredPublicComment: false,

      searchQuery: "",
      searchQueryWords: [],
      searchQueryError: null,
      queryResults: null,
      filteredQueryResults: null,
      queryResultCounties: null,
      countyFilter: "null",
      currentPage: 1,
      totalPages: 1,
      pageSize: 10,
      showResult: false,

      keywords: [],

      //SU23 Added new vars for the new models in models.py
      newKeywords: [],
      provisions: [],
      departments: [],
      masterContract: null,
      municipalities: [],
    };

    // location of plus and minus icons that show up 
    this.icons = {
      'plus': '/static/app/img/plus.png',
      'minus': '/static/app/img/minus.png'
    };

    this.handleTitleClick = this.handleTitleClick.bind(this);

    this.setSearchQuery = this.setSearchQuery.bind(this);
    this.handleSearch = this.handleSearch.bind(this);

    this.provisionsRequest = this.provisionsRequest.bind(this);

    const styles = {
      myTextStyle: {
        textDecoration: 'none',
        '&:hover': {
          color: 'white'
        }
      }
    };

  }
  setSearchQuery(newQuery, autoSearch) {
    this.setState(
      {
        searchQuery: newQuery,
      },
      () => (autoSearch ? this.handleSearch() : null)
    );
  }

  handleSearch(event) {
    if (event) {
      event.preventDefault();
    }

    // parse query
    try {
      // Defines function to remove quotation marks from the search string
      function getQueryWords(query) {
        if (typeof query === "string") {
          // Patrick Gavazzi: removes quotation marks from search string for highlighting
          return [query.replace(/['"]+/g, "")];
        } else {
          throw 'Query is not a string';
        }
      }

      //const searchQuery = SearchParser.parse(this.state.searchQuery);
      const searchQuery = '"' + this.state.searchQuery + '"';
      // parse down to just the words being searched for, for highlighting
      const searchQueryWords = getQueryWords(searchQuery);
      console.log(searchQuery)

      Api.getResearcherSearchResults(searchQuery).then((resp) => {
        // sort based on city name
        resp.sort((a, b) => {
          if (a.name < b.name) {
            return -1;
          }
          if (a.name > b.name) {
            return 1;
          }
          return 0;
        });
        // parse states out
        const respCounties = [...new Set(resp.map((a) => a.name))];
        this.setState({
          //queryResults is set to the response for views.py ResearcherSearchList()
          queryResults: resp,
          filteredQueryResults: resp,
          queryResultCounties: respCounties,
          searchQueryError: null,
          searchQueryWords: searchQueryWords,
          countyFilter: "null",
          totalPages: Math.ceil(resp.length / this.state.pageSize),
          showResult: true,
        });
      });
      // TODO: Modify this URLSearchParam to allow for selection of location
      // will also then need to modify API, and Python method (and possible urls.py)
      // set search query param
      this.props.history.push({
        pathname: routes.researchers,
        search:
          "?" +
          new URLSearchParams({ search: this.state.searchQuery, }).toString(),
      });
    } catch (err) {
      if (err instanceof SearchParser.SyntaxError) {
        this.setState({
          searchQueryError: err,
        });
      } else {
        throw err;
      }
    }
  }


  handleTitleClick(to_show) {
    // Look for which click was executed

    if (to_show == "unfounded") {
      this.setState({ showUnfounded: !this.state.showUnfounded });
    } else if (to_show == "Interview") {
      this.setState({ showInterview: !this.state.showInterview });
    } else if (to_show == "Interrogation") {
      this.setState({ showInterrogation: !this.state.showInterrogation });
    } else if (to_show == "FalseArrest") {
      this.setState({ showFalseArrest: !this.state.showFalseArrest });
    } else if (to_show == "Reprimand") {
      this.setState({ showReprimand: !this.state.showReprimand });
    } else if (to_show == "PublicComment") {
      this.setState({ showPublicComment: !this.state.showPublicComment });
    }

    // Maybe use latter
    // scrollToElement("#citizenInfoPanel");
  }

  componentDidMount() {
    // make sure that the page is always loaded at the top
    window.scrollTo(0, 0);

    Api.getProvisions().then((resp) => {
      this.setState({
        provisions: resp,
      });
    });
  }

  /*
  componentDidMount() {
    // make sure that the page is always loaded at the top
    window.scrollTo(0, 0);
  }*/

  generateCategories() {
    let insert = [];
    let counter = 0;
    for (var i in keys) {
      const strcounter = "cat" + counter;
      insert.push(<div id={strcounter} onClick={() => this.getKeywords({ strcounter })}> 
      <a href="javascript:void(0)"> {i} </a> </div>);
      counter++;
    }
    return insert;
  }

  getKeywords(item) {
    let counter = 0;
    let insert = [];
    let id = Number(item.strcounter.slice(3));
    for (var category in keys) {
      if (counter == id) {
        for (var key in keys[category])
          insert.push(keys[category][key]);
        break;
      }
      counter++;
    }
    this.setState({ keywords: insert });
  }

  genContent(evt, name) {
    // Declare all variables
    var i, tabcontent, tablinks;
  
    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
  
    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
  
    // Show the current tab, and add an "active" class to the link that opened the tab
    document.getElementById(name).style.display = "block";
    evt.currentTarget.className += " active";
  }
  
  provisionsRequest(){
    Api.getProvisions().then((resp) => {
      this.setState({
        provisions: resp,
      });
    });
  }

  keywordsRequest(){
    Api.getKeywords().then((resp) => {
      this.setState({
        newKeywords: resp,
      });
    });
  }

  departmentRequest(){
    Api.getDepartment().then((resp) => {
      this.setState({
        departments: resp,
      });
    });
  }

  municipalityRequest(){
    Api.getMunicipality().then((resp) => {
      this.setState({
        municipalities: resp,
      });
    });
  }

  masterContractRequest(){
    Api.getMasterContract().then((resp) => {
      this.setState({
        masterContract: resp,
      });
    });
  }

  render() {

    const categories = this.generateCategories();
    // maybe put in class
    const dropUnfounded = this.state.showUnfounded ? "show" : "";
    let iconUnfounded = this.icons['plus'];
    if (this.state.showUnfounded) {
      iconUnfounded = this.icons['minus'];
    }

    const dropInterview = this.state.showInterview ? "show" : "";
    let iconInterview = this.icons['plus'];
    if (this.state.showInterview) {
      iconInterview = this.icons['minus'];
    }


    const dropInterrogation = this.state.showInterrogation ? "show" : "";
    let iconInterrogation = this.icons['plus'];
    if (this.state.showInterrogation) {
      iconInterrogation = this.icons['minus'];
    }

    const dropFalse = this.state.showFalseArrest ? "show" : "";
    let iconFalse = this.icons['plus'];
    if (this.state.showFalseArrest) {
      iconFalse = this.icons['minus'];
    }

    const dropReprimand = this.state.showReprimand ? "show" : "";
    let iconReprimand = this.icons['plus'];
    if (this.state.showReprimand) {
      iconReprimand = this.icons['minus'];
    }

    const dropPublicComment = this.state.showPublicComment ? "show" : "";
    let iconComment = this.icons['plus'];
    if (this.state.showPublicComment) {
      iconComment = this.icons['minus'];
    }

    /*
    window.onload = function(){
      hideAllTabs();
   }
   function hideAllTabs(){
    var tabcontent = document.getElementsByClassName("tabcontent");
      for (var i = 0; i < tabcontent.length; i++) {
          tabcontent[i].style.display = "none";
      }
    }*/

    return (
      <div className="row mt-3">
        <div className="col-lg-12">
          <h3 style={{ color: 'darkblue', fontWeight: 700, marginTop: 40 }}>
            Search Police Contracts
          </h3>
          {/*
          <div
            class="topimage"
          > {/* Removed className="jumbotron"     style={{
            backgroundImage:
              "url(http://www.rmmagazine.com/images/default-source/MagazineImages/2019/07/rm7-8-19_ff_contractrisks.jpg?Status=Master&sfvrsn=9b4a261a_0)",
            backgroundSize: "100%",
            paddingTop: "60px",
            paddingBottom: "90px",
            borderRadius: "5px",
          }}*/} {/*
            {/* figure out a better way to add in the spaces */} {/*
            <br />
            <br />
            <br />
          </div> */}
          <div> {/* this is the row div*/}
            <br />
            <br />
            <br />
            <div>
              <div style={{ width: "100%", textAlign: "center"}}> {/* width: 50  float rightdiv before this for column */}
                <br />
                <h4> <b> Find Matching Text </b> </h4>
                <li className="nav-item nav-link">
                  <div className="col-md-6 offset-md-3">
                    <form onSubmit={(e) => this.handleSearch(e)}>
                      <div 
                      className="input-group"
                      style={{}}>
                        <input
                          type="text"
                          className={`form-control input-lg ${this.state.searchQueryError ? "border-danger" : ""
                            }`}
                          placeholder="Find terms in contracts..." //Search Query...

                          value={this.state.searchQuery}
                          onChange={(event) =>
                            this.setSearchQuery(event.target.value, false)
                          }
                        />
                        <div className="input-group-append">
                          <button className="btn btn-outline-primary" type="submit">
                            <FontAwesomeIcon icon={faSearch} />
                          </button>
                        </div>
                      </div>
                      {this.state.searchQueryError && (
                        <p className="text-danger text-center">
                          This search query is invalid
                        </p>
                      )}
                    </form>
                    <br />

                    {/* Here is content to be removed 
                    <div>
                      <div // className="scrollable"
                      id="categories" 
                      style={{
                        textAlign: "left",
                        overflowY: "scroll",
                        textDecoration: "underline",
                        height: "100px",
                        color: "#00008b",
                      }}
                      onLoadStart={() => generateCategories()}>
                        {/* <div id="disqualify" onClick={() => this.getKeywords("disqualify")}>Disqualify Misconduct Complaints</div>
                        <div id="prevents" onClick={() => this.getKeywords("prevents")}>Prevents Immediate Interrogation</div>
                        <div id="unfair" onClick={() => this.getKeywords("unfair")}>Unfair Access to Information</div>
                        <div id="legal" onClick={() => this.getKeywords("legal")}>Legal Costs</div>
                        <div id="destroys" onClick={() => this.getKeywords("destroys")}>Destroys Misconduct Records</div>
                        <div id="limits" onClick={() => this.getKeywords("limits")}>Limits Disciplicary Consequences</div> */} {/*
                        {categories}
                      </div>
                      <br />
                      <div id="information">
                        <div style={{
                          textAlign: "right"
                        }}>
                          Suggested key words:
                        </div>
                        {this.state.keywords.map((keyword, i) =>
                        (
                          <a href={"/PxPUC/#/researchers?search=" + keyword.replace(/ /g, '+')}>
                            {i == (this.state.keywords.length - 1) ? keyword : keyword + ", "}
                          </a>
                        )
                        )
                        }
                      </div>
                    </div> {/* End of content to be removed */}
                  </div>
                  <a href='/static/app/instructions/How_to_read_a_contract.pdf' style={{ fontSize: "1.3rem" }} download>
                    How to read a contract *(PDF)
                      </a>
                </li>
              </div>
            </div>
            <div >
              <div style={{ width: "100%", textAlign: "left"}}> {/* width: 50 div before this for column */}
                <br />
                <h4> <b> Search by Topics </b> </h4>
                <b style={{color: "grey"}}> Click the boxes to learn more </b>
                <br />
                <div class="tab">
                  <button class="tablinks" onClick={(event) => this.genContent(event, 'c1')}> Disqualify Misconduct Complaints </button>
                  <button class="tablinks" onClick={(event) => this.genContent(event, 'c2')}> Prevents Immediate Interrogation </button>
                  <button class="tablinks" onClick={(event) => this.genContent(event, 'c3')}> Unfair Access to Information </button>
                  <button class="tablinks" onClick={(event) => this.genContent(event, 'c4')}> Legal Costs </button>
                  <button class="tablinks" onClick={(event) => this.genContent(event, 'c5')}> Destroys Misconduct Records </button>
                  <button class="tablinks" onClick={(event) => this.genContent(event, 'c6')}> Limits Disciplinary Consequences </button>
                </div>

                <div id="c1" class="tabcontent">
                  <b> Disqualify Misconduct Complaints </b>
                  <p> Language that falls under this category disqualifies misconduct complaints that are filed 
                    anonymously or are not filed within a set time period.</p>
                  <b> Search related keywords </b>
                  <br />
                  {/*<NavLink
                      to={routes.researchers + "?search=unfounded"}
                      style={{ color: "#00008b", textDecoration: "underline"}}>
                      Unfounded
                      </NavLink>Test*/}
                    <a href={"/PxPUC/#/researchers?search=unfounded" }> Unfounded </a>
                    <br />
                    <a href={"/PxPUC/#/researchers?search=citizen+complaint" }> Citizen Complaint </a>
                </div>

                <div id="c2" class="tabcontent">
                  <b>Prevents Immediate Interrogation </b>
                  <p> Language that falls under this category prevents police officers from being interrogated 
                    immediately after a “critical incident” and restricts when, where, and how officers are interrogated.</p>
                  <b> Search related keywords </b>
                  <br />
                  <a href={"/PxPUC/#/researchers?search=interview" }> Interview </a>
                  <br />
                  <a href={"/PxPUC/#/researchers?search=crtitical+incident" }> Critical Incident </a>
                </div>

                <div id="c3" class="tabcontent">
                  <b> Unfair Access to Information </b>
                  <p> Language that falls under this category gives officers access to information that civilians do not 
                    get prior to interrogation. </p>
                  <b> Search related keywords </b>
                  <br />
                    <a href={"/PxPUC/#/researchers?search=interrogation" }> Interrogation </a>
                    <br />
                    <a href={"/PxPUC/#/researchers?search=accused" }> Accused </a>
                </div>

                <div id="c4" class="tabcontent">
                  <b> Legal Costs </b>
                  <p> Language that falls under this category requires municipalities to pay costs related to police misconduct.
                    This includes requiring cities to buy false arrest insurance and pay out legal settlements.</p>
                  <b> Search related keywords </b>
                  <br />
                    <a href={"/PxPUC/#/researchers?search=false+arrest" }> False Arrest </a>
                    <br />
                    <a href={"/PxPUC/#/researchers?search=liability+insurance" }> Liability Insurance </a>
                    <br />
                    <a href={"/PxPUC/#/researchers?search=defense+insurance" }> Defense Insurance </a>
                </div>

                <div id="c5" class="tabcontent">
                  <b> Destroys Misconduct Records </b>
                  <p> Language that falls under this category prevents some misconduct accusations from being recorded in an 
                    officer’s personnel file and also requires that records of misconduct are removed from personnel files and 
                    destroyed after a set period of time.</p>
                  <b> Search related keywords </b>
                  <br />
                    <a href={"/PxPUC/#/researchers?search=reprimand" }> Reprimand </a>
                    <br />
                    <a href={"/PxPUC/#/researchers?search=personal+file" }> Personal File </a>
                </div>

                <div id="c6" class="tabcontent">
                  <b> Limits Disciplinary Consequences </b>
                  <p> Language that falls under this category limits the release of information that could help the media and 
                    the public hold police accountable.</p>
                  <b> Search related keywords </b>
                  <br />
                    <a href={"/PxPUC/#/researchers?search=public+comment" }> Public Comment </a>
                </div>
              </div>
            </div>
          </div>


          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
       
          {/* 
          <div style={{ fontSize: "27px",fontFamily: 'Helvetica', fontStyle:'normal',fontWeight: 700,lineHeight: "31px",color: "#000D85" }}> More Information </div>
          <br />
          <div>
            <div className="jumbotron"
              style={{ textAlign: "left", fontWeight: 600, marginBottom: "0px" }}
            >
              <p style={{ fontSize: "22px",fontFamily: 'Helvetica', fontStyle: 'normal',fontWeight: 700,lineHeight: "25px",color: "#202020" }}> About Police Contracts</p>
              <p className="lead">
                There are 108 separate governmental police departments operating in Allegheny County. This includes departments operating at the municipal, regional, county, and state level, from Stowe Township to the Pennsylvania State Troopers. We have gathered police contracts from almost 100 of these departments and made them publicly available for searches and downloads. We hope that this contract database will help concerned citizens learn more about police departments in Allegheny County and perhaps even help them advocate for change. <a href='/static/app/instructions/How_to_read_a_contract.pdf' download> How to read a contract *(PDF) </a>
              </p>

              <p style={{ fontSize: "22px",fontFamily: 'Helvetica', fontStyle: 'normal',fontWeight: 700,lineHeight: "25px",color: "#202020" }}>Using the Search Function </p>
              <p className="lead">
                These contracts may contain provisions that make it more difficult to hold officers accountable. Below we list six categories of potentially problematic provisions that have been identified by Campaign Zero, a national organization, in collaboration with legal scholars and criminal justice experts.  In each we identified some keywords that you can use as a starting point to explore how these categories apply to policing in Allegheny County. For example, clicking on the keyword “unfounded” (under Category 1: Disqualify Misconduct Complaints) reveals that nearly half of the county’s police contracts disqualify misconduct complaints from the public that are submitted anonymously.
              </p>
            </div>
          </div>
          <br />
          <br />
          <h3 style={{ fontWeight: "300" }}>
            Search by categories
          </h3>
          <div
            className="col-md-10 offset-md-1"
            style={{
              borderRadius: 10,
              backgroundColor: "#EAECEF",
              borderRadius: 10,
              paddingTop: 20,
              paddingBottom: 50,
              paddingLeft: 20,
              paddingRight: 20,
              minHeight: "5%",
              flex: 1,
              flexDirection: "column",
              justifyContent: "center",
              flexWrap: 'wrap',
              overflow: "hidden",
            }}
          >
            <div onClick={() => this.handleTitleClick("unfounded")}
              // Patrick: add style to make it easier for user to see what they can click on 
              onMouseOut={() => this.setState({ hoveredUnfounded: false })}
              onMouseOver={() => this.setState({ hoveredUnfounded: true })}
              style={{ paddingBottom: 5 }}
            >
              <img
                src={iconUnfounded}
                style={{ width: "30px", height: "30px", transform: `${this.state.hoveredUnfounded ? 'scale(1.3,1.3)' : 'scale(1,1)'}` }}
              ></img>
              <a className="position-absolute"
                style={{ color: "black", paddingLeft: "15px", textDecoration: `${this.state.hoveredUnfounded ? 'underline' : ''}` }}
              >
                1. <span style={{ fontWeight: "bold" }}>Disqualify Misconduct Complaints</span>
                <br />
                Language that falls under this category disqualifies misconduct complaints that are filed anonymously or are not filed within a set time period.
              </a>
            </div>
            <div className={"collapse nav-collapse " + dropUnfounded} style={{ paddingTop: "30px" }}>
              <div className={"col-md-6 offset-md-1"}>
                <br />
                <a>
                  <span style={{ fontWeight: "bold" }}> Keyword </span>: unfounded
                </a>
                <br />
                <a>
                  "When an anonymous complaint is made against a police officer
                  and no corroborative evidence is obtained, the complaint shall
                  be classified as <span style={{ fontWeight: "bold" }}>unfounded</span>." (Bethel Park)
                </a>
                <br />
                <button
                  type="button"
                  color="#ff5c5c"
                  className="ex-keyword btn btn-info mr-2"
                >
                  <NavLink
                    to={routes.researchers + "?search=unfounded"}
                    style={{ color: "#ffc92e" }}
                  >
                    {" "}
                    search contracts for "unfounded"{" "}
                  </NavLink>
                </button>
                <br />
                <br />
                <br />
                <a>
                  <span style={{ fontWeight: "bold" }}> Keyword </span>: citizen
                  complaint
                </a>
                <br />
                <a>
                  "When a citizen <span style={{ fontWeight: "bold" }}> complaint </span> is filed, it must be done in
                  writing, signed by the complainant and filed no later than
                  fifteen (15) days from the alleged event." (Braddock Borough)
                </a>
                <br />
                <button
                  type="button"
                  color="#ff5c5c"
                  className="ex-keyword btn btn-info mr-2"
                >
                  <NavLink
                    to={routes.researchers + '?search="citizen+complaint"'}
                    style={{ color: "#ffc92e" }}
                  >
                    {" "}
                    search contracts for "citizen complaint"{" "}
                  </NavLink>
                </button>
              </div>
            </div>
          </div>
          <br />
          <br />
          {/* Interrogation */} {/* 
          <div
            className="col-md-10 offset-md-1"
            style={{
              borderRadius: 10,
              backgroundColor: "#EAECEF",
              borderRadius: 10,
              paddingTop: 20,
              paddingBottom: 50,
              paddingLeft: 20,
              paddingRight: 20,
              minHeight: "5.5%",
              flex: 1,
              flexDirection: "column",
              justifyContent: "center",
              flexWrap: 'wrap',
              overflow: "hidden",
            }}
          >
            <div class="expandClickables" onClick={() => this.handleTitleClick("Interview")}
              onMouseOut={() => this.setState({ hoveredInterview: false })}
              onMouseOver={() => this.setState({ hoveredInterview: true })}
            >
              <img src={iconInterview}
                style={{ width: "30px", height: "30px", transform: `${this.state.hoveredInterview ? 'scale(1.3,1.3)' : 'scale(1,1)'}` }}
              ></img>
              <a className="position-absolute"
                style={{ color: "black", paddingLeft: "15px", textDecoration: `${this.state.hoveredInterview ? 'underline' : ''}` }}
              >
                2. <span style={{ fontWeight: "bold" }}>Prevents Immediate Interrogation{" "}</span>
                <br />
                Language that falls under this category prevents police officers from being interrogated immediately after a “critical incident” and restricts when, where, and how officers are interrogated.
              </a>
            </div>
            <div className={"col-md-6 offset-md-1 collapse nav-collapse " + dropInterview}
              style={{ paddingTop: "50px" }}
            >
              <br />
              <a>
                <span style={{ fontWeight: "bold" }}> Keyword </span>: interview
              </a>
              <br />
              <a>
                "The criminal investigatory <span style={{ fontWeight: "bold" }}> interview </span> of the deputy shall not be
                conducted until expiration of seventy-two (72) hours following
                the shooting/incident unless there are exigent circumstances"
                (Allegheny County Sheriff's Department)
              </a>
              <br />
              <button
                type="button"
                color="#ff5c5c"
                className="ex-keyword btn btn-info mr-2"
              >
                <NavLink
                  to={routes.researchers + "?search=interview"}
                  style={{ color: "#ffc92e" }}
                >
                  {" "}
                  search contracts for "interview"{" "}
                </NavLink>
              </button>
              <br />
              <br />
              <br />
              <a>
                <span style={{ fontWeight: "bold" }}> Keyword </span>: critical
                incident
              </a>
              <br />
              <a>
                "An officer involved in a <span style={{ fontWeight: "bold" }}>critical incident</span> shall be permit 72
                hours (3 sleep cycles) after the critical incident to make any
                official statement, report, and interview."" (Penn Hills)
              </a>
              <br />
              <button
                type="button"
                color="#ff5c5c"
                className="ex-keyword btn btn-info mr-2"
              >
                <NavLink
                  to={routes.researchers + '?search="critical+incident"'}
                  style={{ color: "#ffc92e" }}
                >
                  {" "}
                  search contracts for "critical incident"{" "}
                </NavLink>
              </button>
            </div>
          </div>
          <br />
          <br />
          {/* Information */} {/* 
          <div
            className="col-md-10 offset-md-1"
            style={{
              borderRadius: 10,
              backgroundColor: "#EAECEF",
              borderRadius: 10,
              paddingTop: 20,
              paddingBottom: 30,
              paddingLeft: 20,
              paddingRight: 20,
              minHeight: "4.5%",
              flex: 1,
              flexDirection: "column",
              justifyContent: "center",
              flexWrap: 'wrap',
              overflow: "hidden",
            }}
          >
            <div class="expandClickables" onClick={() => this.handleTitleClick("Interrogation")}
              onMouseOut={() => this.setState({ hoveredInterrogation: false })}
              onMouseOver={() => this.setState({ hoveredInterrogation: true })}
            >
              <img
                src={iconInterrogation}
                style={{ width: "30px", height: "30px", transform: `${this.state.hoveredInterrogation ? 'scale(1.3,1.3)' : 'scale(1,1)'}` }}
              ></img>
              <a
                className="position-absolute"
                style={{ color: "black", paddingLeft: "15px", textDecoration: `${this.state.hoveredInterrogation ? 'underline' : ''}` }}
              >
                3. <span style={{ fontWeight: "bold" }}>Unfair Access to Information</span>
                <br />
                Language that falls under this category gives officers access to information that civilians do not get prior to interrogation.
              </a>
            </div>
            <div className={"col-md-6 offset-md-1 collapse nav-collapse " + dropInterrogation} style={{ paddingTop: "30px" }}>
              <br />
              <a>
                <span style={{ fontWeight: "bold" }}> Keyword </span>:
                interrogation
              </a>
              <br />
              <a>
                "A police officer, whether a subject or witness, must be
                informed of the nature of the interrogation at the outset of the
                {" "} <span style={{ fontWeight: "bold" }}> interrogation</span> {" "}."
                (Avalon Borough)
              </a>
              <br />
              <button
                type="button"
                color="#ff5c5c"
                className="ex-keyword btn btn-info mr-2"
              >
                <NavLink
                  to={routes.researchers + "?search=interrogation"}
                  style={{ color: "#ffc92e" }}
                >
                  {" "}
                  search contracts for "interrogation"{" "}
                </NavLink>
              </button>
              <br />
              <br />
              <br />
              <a>
                <span style={{ fontWeight: "bold" }}> Keyword </span>: accused
              </a>
              <br />
              <a>
                "When a written complaint is made against an officer, the
                Township will provide a copy of the complaint to the
                {" "} <span style={{ fontWeight: "bold" }}>accused</span> {" "}
                officer." (Baldwin Township)
              </a>
              <br />
              <button
                type="button"
                color="#ff5c5c"
                className="ex-keyword btn btn-info mr-2"
              >
                <NavLink
                  to={routes.researchers + "?search=accused"}
                  style={{ color: "#ffc92e" }}
                >
                  {" "}
                  search contracts for "accused"{" "}
                </NavLink>
              </button>
            </div>
          </div>
          <br />
          <br />
          {/* falsearrest */} {/* 
          <div
            className="col-md-10 offset-md-1"
            style={{
              borderRadius: 10,
              backgroundColor: "#EAECEF",
              borderRadius: 10,
              paddingTop: 20,
              paddingBottom: 50,
              paddingLeft: 20,
              paddingRight: 20,
              minHeight: "6%",
              flex: 1,
              flexDirection: "column",
              justifyContent: "center",
              flexWrap: 'wrap',
              overflow: "hidden",
            }}
          >
            <div class="expandClickables" onClick={() => this.handleTitleClick("FalseArrest")}
              onMouseOut={() => this.setState({ hoveredFalseArrest: false })}
              onMouseOver={() => this.setState({ hoveredFalseArrest: true })}
            >
              <img
                src={iconFalse}
                style={{ width: "30px", height: "30px", transform: `${this.state.hoveredFalseArrest ? 'scale(1.3,1.3)' : 'scale(1,1)'}` }}
              ></img>
              <a
                className="position-absolute"
                style={{ color: "black", paddingLeft: "15px", textDecoration: `${this.state.hoveredFalseArrest ? 'underline' : ''}` }}
              >
                4. <span style={{ fontWeight: "bold" }}> Legal Costs </span>
                <br />
                Language that falls under this category requires municipalities to pay costs related to police misconduct. This includes requiring cities to buy false arrest insurance and pay out legal settlements.
              </a>
            </div>
            <div className={"col-md-6 offset-md-1 collapse nav-collapse " + dropFalse} style={{ paddingTop: "50px" }}>
              <br />
              <a>
                <span style={{ fontWeight: "bold" }}> Keyword </span>: false
                arrest
              </a>
              <br />
              <a>
                "The Borough shall provide each Officer with
                {" "} <span style={{ fontWeight: "bold" }}>false arrest</span> {" "}
                insurance coverage as provided in 2008, which includes coverage
                for false arrest, detention, imprisonment or malicious
                prosecution." (Churchill Borough)
              </a>

              <br />

              <button
                type="button"
                color="#ff5c5c"
                className="ex-keyword btn btn-info mr-2"
              >
                <NavLink
                  to={routes.researchers + '?search="false+arrest"'}
                  style={{ color: "#ffc92e" }}
                >
                  {" "}
                  search contracts for "false arrest"{" "}
                </NavLink>
              </button>

              <br />
              <br />
              <br />

              <a>
                <span style={{ fontWeight: "bold" }}> Keyword </span>: liability
                insurance
              </a>
              <br />
              <a>
                "The Borough shall pay for 100% of the premium for police
                professional <span style={{ fontWeight: "bold" }}>liability insurance</span>." (Baldwin Borough)
              </a>

              <br />

              <button
                type="button"
                color="#ff5c5c"
                className="ex-keyword btn btn-info mr-2"
              >
                <NavLink
                  to={routes.researchers + '?search="liability+insurance"'}
                  style={{ color: "#ffc92e" }}
                >
                  {" "}
                  search contracts for "liability insurance"{" "}
                </NavLink>
              </button>

              <br />
              <br />
              <br />

              <a>
                <span style={{ fontWeight: "bold" }}> Keyword </span>: defense
                insurance
              </a>
              <br />
              <a>
                "The City shall provide and pay the full cost of the premiums
                for Criminal and Civil <span style={{ fontWeight: "bold" }}>Defense Insurance</span> for all police
                officers." (Duquesne City)
              </a>

              <br />

              <button
                type="button"
                color="#ff5c5c"
                className="ex-keyword btn btn-info mr-2"
              >
                <NavLink
                  to={routes.researchers + '?search="defense+insurance"'}
                  style={{ color: "#ffc92e" }}
                >
                  {" "}
                  search contracts for "defense insurance"{" "}
                </NavLink>
              </button>
            </div>
          </div>

          <br />
          <br />


          {/* Reprimand */} {/*
          <div
            className="col-md-10 offset-md-1"
            style={{
              borderRadius: 10,
              backgroundColor: "#EAECEF",
              borderRadius: 10,
              paddingTop: 20,
              paddingBottom: 50,
              paddingLeft: 20,
              paddingRight: 20,
              minHeight: "6.5%",
              flex: 1,
              flexDirection: "column",
              justifyContent: "center",
              flexWrap: 'wrap',
              overflow: "hidden",
            }}
          >
            <div class="expandClickables" onClick={() => this.handleTitleClick("Reprimand")}
              onMouseOut={() => this.setState({ hoveredReprimand: false })}
              onMouseOver={() => this.setState({ hoveredReprimand: true })}
            >
              <img src={iconReprimand}
                style={{ width: "30px", height: "30px", transform: `${this.state.hoveredReprimand ? 'scale(1.3,1.3)' : 'scale(1,1)'}` }}
              ></img>
              <a
                className="position-absolute"
                style={{ color: "black", paddingLeft: "15px", textDecoration: `${this.state.hoveredReprimand ? 'underline' : ''}` }}
              >
                5. <span style={{ fontWeight: "bold" }}>Destroys Misconduct Records</span>
                <br />
                Language that falls under this category prevents some misconduct accusations from being recorded in an officer’s personnel file and also requires that records of misconduct are removed from personnel files and destroyed after a set period of time.
              </a>
            </div>
            <div
              className={"col-md-6 offset-md-1 collapse nav-collapse " + dropReprimand} style={{ paddingTop: "100px" }}>
              <a>
                <span style={{ fontWeight: "bold" }}> Keyword </span>: reprimand
              </a>
              <br />
              <a>
                "The written reprimand as herein provided shall not remain in
                effect for a period of more than eighteen (18) months from the
                date of the occurence upon which the complaint and
                written <span style={{ fontWeight: "bold" }}>reprimand</span> are
                based." (Braddock Borough)
              </a>

              <br />

              <button
                type="button"
                color="#ff5c5c"
                className="ex-keyword btn btn-info mr-2"
              >
                <NavLink
                  to={routes.researchers + "?search=reprimand"}
                  style={{ color: "#ffc92e" }}
                >
                  {" "}
                  search contracts for "reprimand"{" "}
                </NavLink>
              </button>

              <br />
              <br />
              <br />

              <a>
                <span style={{ fontWeight: "bold" }}> Keyword </span>: personnel
                file
              </a>
              <br />
              <a>
                The City agrees that any and all disciplinary actions shall only
                be kept in an employee <span style={{ fontWeight: "bold" }}>personnel file</span> for thirty (30) months
                from the date of the infraction and then the infraction shall be
                removed. (Duquesne City)
              </a>

              <br />

              <button
                type="button"
                color="#ff5c5c"
                className="ex-keyword btn btn-info mr-2"
              >
                <NavLink
                  to={routes.researchers + '?search="personnel+file"'}
                  style={{ color: "#ffc92e" }}
                >
                  {" "}
                  search contracts for "personnel file"{" "}
                </NavLink>
              </button>
            </div>
          </div>

          <br />
          <br />

          {/* Disciplinary */} {/*
          <div
            className="col-md-10 offset-md-1"
            style={{
              borderRadius: 10,
              backgroundColor: "#EAECEF",
              borderRadius: 10,
              paddingTop: 20,
              paddingBottom: 30,
              paddingLeft: 20,
              paddingRight: 20,
              minHeight: "4.5%",
              flex: 1,
              flexDirection: "column",
              justifyContent: "center",
              flexWrap: 'wrap',
              overflow: "hidden",
            }}
          >
            <div class="expandClickables" onClick={() => this.handleTitleClick("PublicComment")}
              onMouseOut={() => this.setState({ hoveredPublic: false })}
              onMouseOver={() => this.setState({ hoveredPublic: true })}
              style={{ paddingBottom: "50px", paddingBottom: "50px" }}
            >
              <img src={iconComment}
                style={{ width: "30px", height: "30px", transform: `${this.state.hoveredPublic ? 'scale(1.3,1.3)' : 'scale(1,1)'}` }}
              ></img>
              <a
                className="position-absolute"
                style={{ color: "black", paddingLeft: "15px", textDecoration: `${this.state.hoveredPublic ? 'underline' : ''}` }}
              >
                6. <span style={{ fontWeight: "bold" }}>Limits Disciplinary Consequences</span>
                <br />
                Language that falls under this category limits the release of information that could help the media and the public hold police accountable.
              </a>
            </div>
            <div className={"col-md-6 offset-md-1 collapse nav-collapse " + dropPublicComment}>
              <br />
              <a>
                <span style={{ fontWeight: "bold" }}> Keyword </span>: public
                comment
              </a>
              <br />
              <a>
                "Unless agreed to by the Police Officer or required by law, the
                Borough shall not make any <span style={{ fontWeight: "bold" }}>public comment</span> or statement on the
                reason for any disciplinary action brought against the police
                officer." (Bridgeville Borough)
              </a>
            
              <br />

              <button
                type="button"
                color="#ff5c5c"
                className="ex-keyword btn btn-info mr-2"
              >
                <NavLink
                  to={routes.researchers + '?search="public+comment"'}
                  style={{ color: "#ffc92e" }}
                >
                  {" "}
                  search contracts for "public comment"{" "}
                </NavLink>
              </button>
            </div>
          </div>
          */}
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
        </div>

        {/* Below is just a test to ensure the backend connection is established: WORK IN PROGRESS */}
        <div>
            {this.state.provisions.length}
        </div>

        {/*
        const provisionItems = this.state.provisions.map((p) =>
        <li>{p}</li>
        );
        return (
          <ul>{provisionItems}</ul>
        );*/}

        {/*
        <div>
            {this.state.provisions.map((p) => (
              <p> {p} </p>
            ))}
        </div>*/}
        <div>
          <ul>
            {this.state.provisions.map(provision => (<li key={provision.id}>{provision.category}</li>))} 
          </ul>
        </div>
      </div>
    );
  }
}
export default Commentary;

