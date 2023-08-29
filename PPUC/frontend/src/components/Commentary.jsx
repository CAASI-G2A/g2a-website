import React, { Component } from "react";
import routes from "../routes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import Api from "../libs/api";
import SearchParser from "../libs/researcher_search_lang";
import "../scss/tab.scss";

import keys from "../data/keywords.json";

// From Elias for highlighting: window.scrollTo(0, $('div:contains("THE CONTENT YOU ARE SEARCHING FOR")').offset().top);
//export const queryWordsContext = React.createContext("");
class Commentary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //SU23 Removed searchQuery from local declaration, added to App.jsx and sent down as prop
      //searchQuery: "",
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
      explanations: [],
    };

    this.setSearchQuery = this.setSearchQuery.bind(this);
    this.handleSearch = this.handleSearch.bind(this);

    this.provisionsRequest = this.provisionsRequest.bind(this);
    this.keywordsRequest = this.keywordsRequest.bind(this);
    this.provisionExplRequest = this.provisionExplRequest.bind(this);


  }
  //SU23: Redid setSearchQuery by sending it down as a prop from App.jsx like searchQuery
  setSearchQuery(newQuery) { //removed autoSearch param
    this.props.setSearchQuery(newQuery);
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
      //const searchQuery = '"' + this.state.searchQuery + '"'; THIS LINE REMOVED FOR PROPS
      const searchQuery = '"' + this.props.searchQuery + '"';
      // parse down to just the words being searched for, for highlighting
      const searchQueryWords = getQueryWords(searchQuery);
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
          new URLSearchParams({ search: this.props.searchQuery, }).toString(), //changed state to props
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

  componentDidMount() {
    // make sure that the page is always loaded at the top
    window.scrollTo(0, 0);

    //SU23 Added the API requests for the search box
    this.provisionsRequest();
    this.keywordsRequest();
    this.provisionExplRequest();
  }

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

  provisionExplRequest(){
    Api.getProvisionExpl().then((resp) => {
      this.setState({
        explanations: resp,
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
    //SU23 Added the next three const for use in the frontend, taking the dict and making an array
    const provisionsArray = this.state.provisions.map((x, index) => {
      return x.category
    });

    for (let i = 0; i < provisionsArray.length; i++){
      provisionsArray[i] = provisionsArray[i].charAt(0).toUpperCase() + provisionsArray[i].slice(1).toLowerCase();
    }

    const keywordsArray = this.state.newKeywords.map((x, index) => {
      return x.keyword
    });
    
    const provisionExplArray = this.state.explanations.map((x, index) => {
      return x.explanation
    });

    return (
      <div className="row mt-3">
        <div className="col-lg-12">
          <h3 style={{ color: 'darkblue', fontWeight: 700, marginTop: 40 }}>
            Search Police Contracts
          </h3>
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

                          value={this.props.searchQuery} //change from this.state.searchQuery
                          onChange={(event) =>
                            this.setSearchQuery(event.target.value) //removed false for second param
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
                  <button class="tablinks" onClick={(event) => this.genContent(event, 'c1')}> {provisionsArray[0]} </button>
                  <button class="tablinks" onClick={(event) => this.genContent(event, 'c2')}> {provisionsArray[1]} </button>
                  <button class="tablinks" onClick={(event) => this.genContent(event, 'c3')}> {provisionsArray[2]} </button>
                  <button class="tablinks" onClick={(event) => this.genContent(event, 'c4')}> {provisionsArray[3]} </button>
                  <button class="tablinks" onClick={(event) => this.genContent(event, 'c5')}> {provisionsArray[4]} </button>
                  <button class="tablinks" onClick={(event) => this.genContent(event, 'c6')}> {provisionsArray[5]} </button>
                </div>

                {/* SU23: The mapping of keywords/explanations could be done a lot better, just did this to show connection exists */}
                <div id="c1" class="tabcontent">
                  <b> {provisionsArray[0]} </b>
                  <p> {provisionExplArray[0]} </p>
                  <b> Search related keywords </b>
                  <br />
                    {/* keywordsArray[12] = unfounded */}
                    <a href={"/PxPUC/#/researchers?search=" + keywordsArray[12]}> {keywordsArray[12]} </a>
                    <br />
                    {/* keywordsArray[0] = citizen complaint */}
                    <a href={"/PxPUC/#/researchers?search=" + keywordsArray[0]}> {keywordsArray[0]} </a>
                </div>

                <div id="c2" class="tabcontent">
                  <b> {provisionsArray[1]} </b>
                  <p> {provisionExplArray[1]} </p>
                  <b> Search related keywords </b>
                  <br />
                  {/* keywordsArray[5] = interview */}
                  <a href={"/PxPUC/#/researchers?search=" + keywordsArray[5] }> {keywordsArray[5]} </a>
                  <br />
                  {/* keywordsArray[1] = interview */}
                  <a href={"/PxPUC/#/researchers?search=" + keywordsArray[1] }> {keywordsArray[1]} </a>
                </div>

                <div id="c3" class="tabcontent">
                  <b> {provisionsArray[2]} </b>
                  <p> {provisionExplArray[2]} </p>
                  <b> Search related keywords </b>
                  <br />
                    {/* keywordsArray[3] = drug alcohol */}
                    <a href={"/PxPUC/#/researchers?search=" + keywordsArray[3] }> {keywordsArray[3]}</a>
                    <br />
                    {/* keywordsArray[9] = positive test */}
                    <a href={"/PxPUC/#/researchers?search=" + keywordsArray[9] }> {keywordsArray[9]}</a>
                </div>

                <div id="c4" class="tabcontent">
                  <b> {provisionsArray[3]} </b>
                  <p> {provisionExplArray[3]} </p>
                  <b> Search related keywords </b>
                  <br />
                    {/* keywordsArray[4] = drug alcohol */}
                    <a href={"/PxPUC/#/researchers?search=" + keywordsArray[4] }> {keywordsArray[4]} </a>
                    <br />
                    {/* keywordsArray[6] = liability insurance */}
                    <a href={"/PxPUC/#/researchers?search=" + keywordsArray[6]}> {keywordsArray[6]} </a>
                    <br />
                    {/* keywordsArray[2] = defense insurance */}
                    <a href={"/PxPUC/#/researchers?search=" + keywordsArray[2] }> {keywordsArray[2]}</a>
                </div>

                <div id="c5" class="tabcontent">
                  <b> {provisionsArray[4]} </b>
                  <p> {provisionExplArray[4]} </p>
                  <b> Search related keywords </b>
                  <br />
                    {/* keywordsArray[11] = reprimand */}
                    <a href={"/PxPUC/#/researchers?search=" + keywordsArray[11] }> {keywordsArray[11]} </a>
                    <br />
                    {/* keywordsArray[8] = personal file */}
                    <a href={"/PxPUC/#/researchers?search=" + keywordsArray[8] }> {keywordsArray[8]} </a>
                </div>

                <div id="c6" class="tabcontent">
                  <b> {provisionsArray[5]} </b>
                  <p> {provisionExplArray[5]} </p>
                  <b> Search related keywords </b>
                  <br />
                    {/* keywordsArray[10] = public comment */}
                    <a href={"/PxPUC/#/researchers?search=" + keywordsArray[10] }> {keywordsArray[10]} </a>
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
        </div>
      </div>
    );
  }
}
export default Commentary;

