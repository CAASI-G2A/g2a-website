import React, { Component } from "react";
import { NavLink, Link } from "react-router-dom";
import routes from "../routes";

import QueryString from "query-string";
import * as scrollToElement from "scroll-to-element";
import { Alert } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faTimes } from "@fortawesome/free-solid-svg-icons";
import Api from "../libs/api";
import SearchParser from "../libs/researcher_search_lang";
import ResearcherResult from "./ResearcherResult";
import SmallList from "./SmallList";



// TODO: 
//     1. Once classes get fixed... condense code so that the same html text is not repeated over and over again
//     2. Highlight words in setence examples
//     3. find better way to do breaks in code
//     4. find place to put manual serch link
//     5. fix text error




class Commentary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showUnfounded: false,
      showInterview: false,
      showInterrogation: false,
      showFalseArrest: false,
      showReprimand: false,
      showPublicComment: false,
    };
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


  render() {

    // maybe put in class
    const dropUnfounded = this.state.showUnfounded ? "show" : "";
    const dropInterview = this.state.showInterview ? "show" : "";
    const dropInterrogation = this.state.showInterrogation ? "show" : "";
    const dropFalse = this.state.showFalseArrest ? "show" : "";
    const dropReprimand = this.state.showReprimand ? "show" : "";
    const dropPublicComment = this.state.showPublicComment ? "show" : "";

    return (
      <div className="row mt-3">
        <div className="col-lg-12">

          <div
              className="jumbotron"
              style={{
                backgroundImage: "url(http://www.rmmagazine.com/images/default-source/MagazineImages/2019/07/rm7-8-19_ff_contractrisks.jpg?Status=Master&sfvrsn=9b4a261a_0)",
                backgroundSize: "100%",
                paddingTop: "60px",
                paddingBottom: "90px",
              }}
            >
              <br></br>
              <br></br>
              <br></br>
              <br></br>
              <br></br>
              <br></br>
              <br></br>
              <br></br>
              <br></br>

              <div
                opacity={0.5}
                style={{borderRadius: 10, backgroundColor: "#EAECEF", borderRadius: 10, paddingTop: 20, paddingBottom: 20,paddingLeft: 20, paddingRight: 20,}}
              > 
                <h1 style={{ color: "black" }}>HOW POLICE UNION CONTRACTS <br/>  BLOCK ACCOUNTABILITY</h1>
                <hr className="my-4" style={{ borderTop: "1px solid black" }} />
                <div className="col-md-6 offset-md-8">
                  <NavLink to={routes.researchers}>
                      Click Here to Search Contracts Manually
                  </NavLink>
                  {/* <button
                    type="button"
                    color="#ff5c5c"
                    className="ex-keyword btn btn-info mr-2"
                    style={{ width: "200px", height: "50px", fontSize: "15px", paddingBottom: "0px"}}
                  >
                    <NavLink to={routes.researchers} style={{ color: "white"}}>
                      Search Contracts Manually
                    </NavLink>
                  </button> */}
                </div>
              </div>
          </div>

          <div className="pt-5 pl-1 pb-5">
              <h2>
                <span style={{ fontWeight: "bold" }}>
                  {" "} SEARCH BY CAMPAIGN CATEGORY AND KEYWORDS {" "}
                </span>
              </h2>
          </div>

          {/* <div>
            it is <b>{test ? 'true' : 'false'}</b> logged in.
          </div> */}


          <div
            style={{borderRadius: 10, backgroundColor: "#EAECEF", borderRadius: 10, paddingTop: 20, paddingBottom: 20,paddingLeft: 20, paddingRight: 20,}}
            onClick={() => this.handleTitleClick("unfounded")}
          > 
              <a
                className="pt-5"
                data-toggle="collapse"
                aria-expanded="false"
                aria-controls={`hi`}
                href={`hi`}
                style={{ color: "black" }}
              >
                1.{" "}
                <span style={{ fontWeight: "bold" }}>
                  {" "}
                  DISQUALIFY MISCONDUCT COMPLAINTS{" "}
                </span>{" "}
              </a>

              <div
                className={
                  "collapse nav-collapse" + dropUnfounded
                }
              >

                <a>
                  Disqualifying misconduct complaints that are submitted too many days
                  after an incident occurs or if an investigation takes too long to
                  complete
                </a>

                <div
                  className={
                    "col-md-6 offset-md-1"
                  }
                >
                  <br></br>
                  <a>
                    <span style={{ fontWeight: "bold" }}> Keyword </span>: unfounded
                  </a>
                  <br></br>
                  <a>
                    "When an anonymous complaint is made against a police officer and
                    no corroborative evidence is obtained, the complaint shall be
                    classified as unfounded." (Bethel Park)
                  </a>

                  <br></br>

                  <button
                    type="button"
                    color="#ff5c5c"
                    className="ex-keyword btn btn-info mr-2"
                  >
                    <NavLink
                      to={routes.researchers + '?search="unfounded"'}
                      style={{ color: "#ffc92e" }}
                    >
                      {" "}
                      search contracts for "unfounded"{" "}
                    </NavLink>
                  </button>

                  <br></br>
                  <br></br>
                  <br></br>

                  <a>
                    <span style={{ fontWeight: "bold" }}> Keyword </span>: citizen
                    complaint
                  </a>
                  <br></br>
                  <a>
                    "When a citizen complaint is filed, it must be done in writing,
                    signed by the complainant and filed no later than fifteen (15)
                    days from the alleged event."" (Braddock Borough)
                  </a>

                  <br></br>

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

          <br></br>
          <br></br>

          <div
            style={{borderRadius: 10, backgroundColor: "#EAECEF", borderRadius: 10, paddingTop: 20, paddingBottom: 20,paddingLeft: 20, paddingRight: 20,}}
            onClick={() => this.handleTitleClick("Interview")}
          > 

              <a
                className="pt-5"
                data-toggle="collapse"
                aria-expanded="false"
                aria-controls={`hi`}
                href={`hi`}
                style={{ color: "black" }}
              >
                2.{" "}
                <span style={{ fontWeight: "bold" }}>
                  {" "}
                  PREVENTS IMMEDIATE INTERROGATION{" "}
                </span>{" "}
                Preventing police officers from being interrogated immediately after
                being involved in an incident or otherwise restricting how, when, or
                where they can be interrogated
              </a>

              <div
                className={
                  "col-md-6 offset-md-1 collapse nav-collapse " + dropInterview
                }
              >
                <br></br>
                <a>
                  <span style={{ fontWeight: "bold" }}> Keyword </span>: interview
                </a>
                <br></br>
                <a>
                  "The criminal investigatory interview of the deputy shall not be
                  conducted until expiration of seventy-two (72) hours following the
                  shooting/incident unless there are exigent circumstances"
                  (Allegheny County Sheriff's Department)
                </a>

                <br></br>

                <button
                  type="button"
                  color="#ff5c5c"
                  className="ex-keyword btn btn-info mr-2"
                >
                  <NavLink
                    to={routes.researchers + '?search="interview"'}
                    style={{ color: "#ffc92e" }}
                  >
                    {" "}
                    search contracts for "interview"{" "}
                  </NavLink>
                </button>

                <br></br>
                <br></br>
                <br></br>

                <a>
                  <span style={{ fontWeight: "bold" }}> Keyword </span>: critical
                  incident
                </a>
                <br></br>
                <a>
                  "An officer involved in a critical incident shall be permit 72
                  hours (3 sleep cycles) after the critical incident to make any
                  official statement, report, and interview."" (Penn Hills)
                </a>

                <br></br>

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

          <br></br>
          <br></br>


          <div
            style={{borderRadius: 10, backgroundColor: "#EAECEF", borderRadius: 10, paddingTop: 20, paddingBottom: 20,paddingLeft: 20, paddingRight: 20,}}
            onClick={() => this.handleTitleClick("Interrogation")}
          > 


              <a
                className="pt-5"
                data-toggle="collapse"
                aria-expanded="false"
                aria-controls={`hi`}
                href={`hi`}
                style={{ color: "black" }}
              >
                3.{" "}
                <span style={{ fontWeight: "bold" }}>
                  {" "}
                  UNFAIR ACCESS TO INFORMATION{" "}
                </span>{" "}
                Giving officers access to information that civilians do not get
                prior to being interrogated
              </a>

              <div
                className={
                  "col-md-6 offset-md-1 collapse nav-collapse " + dropInterrogation
                }
              >
                <br></br>
                <a>
                  <span style={{ fontWeight: "bold" }}> Keyword </span>:
                  interrogation
                </a>
                <br></br>
                <a>
                  "A police officer, whether a subject or witness, must be informed
                  of the nature of the interrogation at the outset of the
                  interrogation." (Avalon Borough)
                </a>

                <br></br>

                <button
                  type="button"
                  color="#ff5c5c"
                  className="ex-keyword btn btn-info mr-2"
                >
                  <NavLink
                    to={routes.researchers + '?search="interrogation"'}
                    style={{ color: "#ffc92e" }}
                  >
                    {" "}
                    search contracts for "interrogation"{" "}
                  </NavLink>
                </button>

                <br></br>
                <br></br>
                <br></br>

                <a>
                  <span style={{ fontWeight: "bold" }}> Keyword </span>: accused
                </a>
                <br></br>
                <a>
                  "When a written complaint is made against an officer, the Township
                  will provide a copy of the complaint to the accused officer."
                  (Baldwin Township)
                </a>

                <br></br>

                <button
                  type="button"
                  color="#ff5c5c"
                  className="ex-keyword btn btn-info mr-2"
                >
                  <NavLink
                    to={routes.researchers + '?search="accused"'}
                    style={{ color: "#ffc92e" }}
                  >
                    {" "}
                    search contracts for "accused"{" "}
                  </NavLink>
                </button>
              </div>
          </div>

          <br></br>
          <br></br>

          <div
            style={{borderRadius: 10, backgroundColor: "#EAECEF", borderRadius: 10, paddingTop: 20, paddingBottom: 20,paddingLeft: 20, paddingRight: 20,}}
            onClick={() => this.handleTitleClick("FalseArrest")}
          > 
              <a
                className="pt-5"
                data-toggle="collapse"
                aria-expanded="false"
                style={{ color: "black", height: "5" }}
              >
                {" "}
                4. <span style={{ fontWeight: "bold" }}> LEGAL COSTS </span>{" "}
                Requiring cities to pay costs related to police misconduct including
                by giving officers paid leave while under investigation, paying
                legal fees, and/or the cost of settlements
              </a>

              <div
                className={
                  "col-md-6 offset-md-1 collapse nav-collapse " + dropFalse
                }
              >
                {/* <br></br> 
                  <a> 
                  <span style={{fontWeight: "bold"}}> Explanation </span>: Disqualifying misconduct complaints that are submitted too many days after an incident occurs or if an investigation takes too long to complete
                  </a>

                  <br></br> */}

                <br></br>
                <a>
                  <span style={{ fontWeight: "bold" }}> Keyword </span>: false
                  arrest
                </a>
                <br></br>
                <a>
                  "The Borough shall provide each Officer with false arrest
                  insurance coverage as provided in 2008, which includes coverage
                  for false arrest, detention, imprisonment or malicious
                  prosecution." (Churchill Borough)
                </a>

                <br></br>

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

                <br></br>
                <br></br>
                <br></br>

                <a>
                  <span style={{ fontWeight: "bold" }}> Keyword </span>: liability
                  insurance
                </a>
                <br></br>
                <a>
                  "The Borough shall pay for 100% of the premium for police
                  professional liability insurance." (Baldwin Borough)
                </a>

                <br></br>

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

                <br></br>
                <br></br>
                <br></br>

                <a>
                  <span style={{ fontWeight: "bold" }}> Keyword </span>: defense
                  insurance
                </a>
                <br></br>
                <a>
                  "The City shall provide and pay the full cost of the premiums for
                  Criminal and Civil Defense Insurance for all police officers."
                  (Duquesne City)
                </a>

                <br></br>

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

          <br></br>
          <br></br>

          <div
            style={{borderRadius: 10, backgroundColor: "#EAECEF", borderRadius: 10, paddingTop: 20, paddingBottom: 20,paddingLeft: 20, paddingRight: 20,}}
            onClick={() => this.handleTitleClick("Reprimand")}
          > 

              <a
                className="pt-5"
                data-toggle="collapse"
                aria-expanded="false"
                aria-controls={`hi`}
                href={`hi`}
                style={{ color: "black" }}
              >
                5.{" "}
                <span style={{ fontWeight: "bold" }}>
                  {" "}
                  DESTROYS MISCONDUCT RECORDS{" "}
                </span>{" "}
                Preventing information on past misconduct investigations from being
                recorded or retained in an officer's personnel file
              </a>

              <div
                className={
                  "col-md-6 offset-md-1 collapse nav-collapse " + dropReprimand
                }
              >

                <br></br>
                <a>
                  <span style={{ fontWeight: "bold" }}> Keyword </span>: reprimand
                </a>
                <br></br>
                <a>
                  "The written reprimand as herein provided shall not remain in
                  effect for a period of more than eighteen (18) months from the
                  date of the occurence upon which the complaint and written
                  reprimand are based." (Braddock Borough)
                </a>

                <br></br>

                <button
                  type="button"
                  color="#ff5c5c"
                  className="ex-keyword btn btn-info mr-2"
                >
                  <NavLink
                    to={routes.researchers + '?search="reprimand"'}
                    style={{ color: "#ffc92e" }}
                  >
                    {" "}
                    search contracts for "reprimand"{" "}
                  </NavLink>
                </button>

                <br></br>
                <br></br>
                <br></br>

                <a>
                  <span style={{ fontWeight: "bold" }}> Keyword </span>: personnel
                  file
                </a>
                <br></br>
                <a>
                  The City agrees that any and all disciplinary actions shall only
                  be kept in an employee personnel file for thirty (30) months from
                  the date of the infraction and then the infraction shall be
                  removed. (Duquesne City)
                </a>

                <br></br>

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

          <br></br>
          <br></br>

          <div
            style={{borderRadius: 10, backgroundColor: "#EAECEF", borderRadius: 10, paddingTop: 20, paddingBottom: 20,paddingLeft: 20, paddingRight: 20,}}
            onClick={() => this.handleTitleClick("PublicComment")}
          > 
              <a
                className="pt-5"
                data-toggle="collapse"
                aria-expanded="false"
                aria-controls={`hi`}
                href={`hi`}
                style={{ color: "black" }}
              >
                6.{" "}
                <span style={{ fontWeight: "bold" }}>
                  {" "}
                  LIMITS DISCIPLINARY CONSEQUENCES{" "}
                </span>{" "}
                Limiting disciplinary consequences for officers or limiting the
                capacity of civilian oversight structures and/or the media to hold
                police accountable.
              </a>

              <div
                className={
                  "col-md-6 offset-md-1 collapse nav-collapse " + dropPublicComment
                }
              >
                <br></br>
                <a>
                  <span style={{ fontWeight: "bold" }}> Keyword </span>: public
                  comment
                </a>
                <br></br>
                <a>
                  "Unless agreed to by the Police Officer or required by law, the
                  Borough shall not make any public comment or statement on the
                  reason for any disciplinary action brought against the police
                  officer." (Bridgeville Borough)
                </a>

                <br></br>

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
        </div>
      </div>
    );
  }
}
export default Commentary;
