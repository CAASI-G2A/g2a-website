import React, { Component } from "react";

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
import SmallList from "./SmallList";

// TODO:
//     1. Once classes get fixed... condense code so that the same html text is not repeated over and over again
//     2. Highlight words in setence examples
//     3. find better way to do breaks in code
//     4. make keywords look better 
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
    this.icons = {   
        'plus'    : '/static/app/img/plus.png',
        'minus'   : '/static/app/img/minus.png'
    };

    this.handleTitleClick = this.handleTitleClick.bind(this);
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
  }

  render() {
    // maybe put in class
    const dropUnfounded = this.state.showUnfounded ? "show" : "";
    let iconUnfounded = this.icons['plus'];
    if(this.state.showUnfounded){
        iconUnfounded = this.icons['minus'];
    }

    const dropInterview = this.state.showInterview ? "show" : "";
    let iconInterview = this.icons['plus'];
    if(this.state.showInterview){
        iconInterview = this.icons['minus'];
    }


    const dropInterrogation = this.state.showInterrogation ? "show" : "";
    let iconInterrogation = this.icons['plus'];
    if(this.state.showInterrogation){
        iconInterrogation = this.icons['minus'];
    }

    const dropFalse = this.state.showFalseArrest ? "show" : "";
    let iconFalse = this.icons['plus'];
    if(this.state.showFalseArrest){
        iconFalse = this.icons['minus'];
    }

    const dropReprimand = this.state.showReprimand ? "show" : "";
    let iconReprimand = this.icons['plus'];
    if(this.state.showReprimand){
        iconReprimand = this.icons['minus'];
    }

    const dropPublicComment = this.state.showPublicComment ? "show" : "";
    let iconComment = this.icons['plus'];
    if(this.state.showPublicComment){
        iconComment = this.icons['minus'];
    }

    return (
      <div className="row mt-3">
        <div className="col-lg-12">
          <div
            className="jumbotron"
            style={{
              backgroundImage:
                "url(http://www.rmmagazine.com/images/default-source/MagazineImages/2019/07/rm7-8-19_ff_contractrisks.jpg?Status=Master&sfvrsn=9b4a261a_0)",
              backgroundSize: "100%",
              paddingTop: "60px",
              paddingBottom: "90px",
            }}
          >
            {/* figure out a better way to add in the spaces */}
            <br></br>
            <br></br>
            <br></br>
          </div>

          <div className="pt-5 pl-1 pb-5" style={{textAlign: "center"}}>
            <p className="lead" style={{textAlign: "center", fontSize: '3rem', fontWeight: 600}}>
                {" "}EXPLORE POLICE UNION CONTRACTS{" "}
            </p>

            <div className="jumbotron"
                 style={{ textAlign: "left", fontWeight: 600}}
            >
              <p className="lead">
                There are 108 separate governmental police departments operating in
                Allegheny County. This includes departments operating at the
                municipal, regional, county, and state level, from Stowe Township to
                the Pennsylvania State Troopers. We have gathered police contracts
                from almost 100 of these departments and made them publicly
                available to help make policing more transparent in the County.
              </p>
              <p className="lead">
                These contracts often contain controversial provisions that require
                cities to pay legal expenses for police officers accused of
                misconduct and make it more difficult to hold these officers
                accountable. From our preliminary analysis we found that nearly half
                of the contracts disqualify misconduct complaints from the public
                that are submitted anonymously, and nearly a third of contracts
                stipulate that when police officers are disciplined the municipality
                cannot release any information to the public about why discipline
                was imposed.
              </p>
              <p className="lead">
                We hope that this contract database will help concerned citizens
                learn more about police departments in Allegheny County and perhaps
                even help them advocate for change.
              </p>
            </div>
            <li className="nav-item nav-link">
              <NavLink  to={routes.researchers} style={{ fontSize: "1.3rem" }} > Click Here to Search Contracts Manually  </NavLink>
            </li>
            <br></br>
            
            {/* <DownloadLink 
                src="/static/app/instructions/How_to_read_a_contract.pdf"
                style={{
                  fontSize: "20px"       
                }}
            >
               How to read a contract
            </DownloadLink> */}

            <li className="nav-item nav-link">
              <a href='/static/app/instructions/How_to_read_a_contract.pdf' style={{ fontSize: "1.3rem" }} download>
                  How to read a contract *(PDF)
              </a>    
            </li>       
          </div>


          <h3 style={{ fontWeight: "300" }}>
              {" "}SEARCH BY CAMPAIGN CATEGORY AND KEYWORDS{" "}
          </h3>
          
          {/* complaints */}
          <div
            style={{
              borderRadius: 10,
              backgroundColor: "#EAECEF",
              borderRadius: 10,
              paddingTop: 20,
              paddingBottom: 30,
              paddingLeft: 20,
              paddingRight: 20,
            }}
            onClick={() => this.handleTitleClick("unfounded")}
          >
            <img
                src={iconUnfounded}
                style={{ width: "30px", height: "30px"}}
            ></img>
            <a
              className="position-absolute"
              data-toggle="collapse"
              aria-expanded="false"
              aria-controls={`hi`}
              href={`hi`}
              style={{ color: "black",
                       paddingLeft: "15px"
                    }}
            >
              1.{" "}
              <span style={{ fontWeight: "bold" }}>
                {" "}
                DISQUALIFY MISCONDUCT COMPLAINTS{" "}
              </span>{" "}
              <br></br>
              Disqualifying misconduct complaints that are submitted too many
              days after an incident occurs or if an investigation takes too
              long to complete
              {/* <TouchableHighlight 
                        style={styles.button} 
                        onPress={this.toggle.bind(this)}
                        underlayColor="#f1f1f1">
                        <Image
                            style={styles.buttonImage}
                            source={icon}
                        ></Image>
              </TouchableHighlight> */}
            </a>

            <div className={"collapse nav-collapse " + dropUnfounded}>
              <div className={"col-md-6 offset-md-1"}>
                <br></br>
                <a>
                  <span style={{ fontWeight: "bold" }}> Keyword </span>:
                  unfounded
                </a>
                <br></br>
                <a>
                  "When an anonymous complaint is made against a police officer
                  and no corroborative evidence is obtained, the complaint shall
                  be classified as <span style={{ fontWeight: "bold" }}>unfounded</span>." (Bethel Park)
                </a>

                <br></br>

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

                <br></br>
                <br></br>
                <br></br>

                <a>
                  <span style={{ fontWeight: "bold" }}> Keyword </span>: citizen
                  complaint
                </a>
                <br></br>
                <a>
                  "When a citizen <span style={{ fontWeight: "bold" }}> complaint </span> is filed, it must be done in
                  writing, signed by the complainant and filed no later than
                  fifteen (15) days from the alleged event." (Braddock Borough)
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

          {/* Interrogation */}
          <div
            style={{
              borderRadius: 10,
              backgroundColor: "#EAECEF",
              borderRadius: 10,
              paddingTop: 20,
              paddingBottom: 50,
              paddingLeft: 20,
              paddingRight: 20,
            }}
            onClick={() => this.handleTitleClick("Interview")}
          >

             <img
                src={iconInterview}
                style={{ width: "30px", height: "30px"}}
            ></img>

            <a
              className="position-absolute"
              data-toggle="collapse"
              aria-expanded="false"
              aria-controls={`hi`}
              href={`hi`}
              style={{ color: "black",
                       paddingLeft: "15px" 
                    }}
            >
              2.{" "}
              <span style={{ fontWeight: "bold" }}>
                {" "}
                PREVENTS IMMEDIATE INTERROGATION{" "}
              </span>{" "}
              <br></br>
              Preventing police officers from being interrogated immediately
              after being involved in an incident or otherwise restricting how,
              when, or where they can be interrogated
            </a>

            <div
              className={
                "col-md-6 offset-md-1 collapse nav-collapse " + dropInterview
              }
              style={{  paddingTop: "30px"}}
            >
              <br></br>
              <a>
                <span style={{ fontWeight: "bold" }}> Keyword </span>: interview
              </a>
              <br></br>
              <a>
                "The criminal investigatory <span style={{ fontWeight: "bold" }}> interview </span> of the deputy shall not be
                conducted until expiration of seventy-two (72) hours following
                the shooting/incident unless there are exigent circumstances"
                (Allegheny County Sheriff's Department)
              </a>

              <br></br>

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

              <br></br>
              <br></br>
              <br></br>

              <a>
                <span style={{ fontWeight: "bold" }}> Keyword </span>: critical
                incident
              </a>
              <br></br>
              <a>
                "An officer involved in a <span style={{ fontWeight: "bold" }}>critical incident</span> shall be permit 72
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

          {/* Information */}
          <div
            style={{
              borderRadius: 10,
              backgroundColor: "#EAECEF",
              borderRadius: 10,
              paddingTop: 20,
              paddingBottom: 30,
              paddingLeft: 20,
              paddingRight: 20,
            }}
            onClick={() => this.handleTitleClick("Interrogation")}
          >
            <img
                src={iconInterrogation}
                style={{ width: "30px", height: "30px"}}
            ></img>
            <a
              className="position-absolute"
              data-toggle="collapse"
              aria-expanded="false"
              aria-controls={`hi`}
              href={`hi`}
              style={{ color: "black",
                       paddingLeft: "15px"
                    }}
            >
              3.{" "}
              <span style={{ fontWeight: "bold" }}>
                {" "}
                UNFAIR ACCESS TO INFORMATION{" "}
              </span>{" "}
              <br></br>
              Giving officers access to information that civilians do not get
              prior to being interrogated
            </a>

            <div
              className={
                "col-md-6 offset-md-1 collapse nav-collapse " +
                dropInterrogation
              }
            >
              <br></br>
              <a>
                <span style={{ fontWeight: "bold" }}> Keyword </span>:
                interrogation
              </a>
              <br></br>
              <a>
                "A police officer, whether a subject or witness, must be
                informed of the nature of the interrogation at the outset of the
                <span style={{ fontWeight: "bold" }}> interrogation</span>." (Avalon Borough)
              </a>

              <br></br>

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

              <br></br>
              <br></br>
              <br></br>

              <a>
                <span style={{ fontWeight: "bold" }}> Keyword </span>: accused
              </a>
              <br></br>
              <a>
                "When a written complaint is made against an officer, the
                Township will provide a copy of the complaint to the <span style={{ fontWeight: "bold" }}>accused</span> 
                officer." (Baldwin Township)
              </a>

              <br></br>

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

          <br></br>
          <br></br>

          {/* falsearrest */}
          <div
            style={{
              borderRadius: 10,
              backgroundColor: "#EAECEF",
              borderRadius: 10,
              paddingTop: 20,
              paddingBottom: 50,
              paddingLeft: 20,
              paddingRight: 20,
            }}
            onClick={() => this.handleTitleClick("FalseArrest")}
          >
            <img
                src={iconFalse}
                style={{ width: "30px", height: "30px"}}
            ></img>
            <a
              className="position-absolute"
              data-toggle="collapse"
              aria-expanded="false"
              style={{ color: "black",
                       paddingLeft: "15px"
              }}
            >
              {" "}
              4. <span style={{ fontWeight: "bold"}}> LEGAL COSTS </span>{" "}
              <br></br>
              Requiring cities to pay costs related to police misconduct
              including by giving officers paid leave while under investigation,
              paying legal fees, and/or the cost of settlements
            </a>
            

            <div
              className={
                "col-md-6 offset-md-1 collapse nav-collapse " + dropFalse
              }
              style={{ paddingTop: "30px"}}
            >
              <br></br>
              <a>
                <span style={{ fontWeight: "bold" }}> Keyword </span>: false
                arrest
              </a>
              <br></br>
              <a>
                "The Borough shall provide each Officer with <span style={{ fontWeight: "bold" }}>false arrest</span>
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
                professional <span style={{ fontWeight: "bold" }}>liability insurance</span>." (Baldwin Borough)
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
                "The City shall provide and pay the full cost of the premiums
                for Criminal and Civil <span style={{ fontWeight: "bold" }}>Defense Insurance</span> for all police
                officers." (Duquesne City)
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


          {/* Reprimand */}
          <div
            style={{
              borderRadius: 10,
              backgroundColor: "#EAECEF",
              borderRadius: 10,
              paddingTop: 20,
              paddingBottom: 30,
              paddingLeft: 20,
              paddingRight: 20,
            }}
            onClick={() => this.handleTitleClick("Reprimand")}
          >
            <img
                src={iconReprimand}
                style={{ width: "30px", height: "30px"}}
            ></img>
            <a
              className="position-absolute"
              data-toggle="collapse"
              aria-expanded="false"
              aria-controls={`hi`}
              href={`hi`}
              style={{ color: "black",
                       paddingLeft: "15px"
                    }}
            >
              5.{" "}
              <span style={{ fontWeight: "bold"}}>
                {" "}
                DESTROYS MISCONDUCT RECORDS{" "}
              </span>{" "}
              <br></br>
              Preventing information on past misconduct investigations from
              being recorded or retained in an officer's personnel file
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
                <span style={{ fontWeight: "bold" }}>reprimand</span> are based." (Braddock Borough)
              </a>

              <br></br>

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
                be kept in an employee <span style={{ fontWeight: "bold" }}>personnel file</span> for thirty (30) months
                from the date of the infraction and then the infraction shall be
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

          {/* Disciplinary */}
          <div
            style={{
              borderRadius: 10,
              backgroundColor: "#EAECEF",
              borderRadius: 10,
              paddingTop: 20,
              paddingBottom: 30,
              paddingLeft: 20,
              paddingRight: 20,
            }}
            onClick={() => this.handleTitleClick("PublicComment")}
          >
            <img
                src={iconComment}
                style={{ width: "30px", height: "30px"}}
            ></img>
            <a
              className="position-absolute"
              data-toggle="collapse"
              aria-expanded="false"
              aria-controls={`hi`}
              href={`hi`}
              style={{ color: "black",
                       paddingLeft: "15px"
                    }}
            >
              6.{" "}
              <span style={{ fontWeight: "bold" }}>
                {" "}
                LIMITS DISCIPLINARY CONSEQUENCES{" "}
              </span>{" "}
              <br></br>
              Limiting disciplinary consequences for officers or limiting the
              capacity of civilian oversight structures and/or the media to hold
              police accountable.
            </a>

            <div
              className={
                "col-md-6 offset-md-1 collapse nav-collapse " +
                dropPublicComment
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
                Borough shall not make any <span style={{ fontWeight: "bold" }}>public comment</span> or statement on the
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

          <br></br>
          <br></br>
        </div>
      </div>
    );
  }
}
export default Commentary;
