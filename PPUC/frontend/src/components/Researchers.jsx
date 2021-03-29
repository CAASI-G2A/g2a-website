import React, { Component } from "react";
import QueryString from "query-string";
import * as scrollToElement from "scroll-to-element";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faTimes } from "@fortawesome/free-solid-svg-icons";
import Api from "../libs/api";
import SearchParser from "../libs/researcher_search_lang";
import routes from "../routes";
import ResearcherResult from "./ResearcherResult";

class Researchers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: "",
      searchQueryWords: [],
      searchQueryError: null,
      queryResults: null,
      filteredQueryResults: null,
      queryResultStates: null,
      stateFilter: "null",
      currentPage: 1,
      totalPages: 1,
      pageSize: 10,
    };
    this.setPage = this.setPage.bind(this);
    this.setPageSize = this.setPageSize.bind(this);
    this.setSearchQuery = this.setSearchQuery.bind(this);
    this.setStateFilter = this.setStateFilter.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  setPage(newPage) {
    this.setState({
      currentPage: newPage,
    });
    // scroll to top
    scrollToElement("#results");
  }

  setPageSize(newPageSize) {
    newPageSize = parseInt(newPageSize);
    this.setState({
      pageSize: newPageSize,
      totalPages: Math.ceil(
        this.state.filteredQueryResults.length / newPageSize
      ),
      currentPage: 1,
    });
  }

  setSearchQuery(newQuery, autoSearch) {
    this.setState(
      {
        searchQuery: newQuery,
      },
      () => (autoSearch ? this.handleSearch() : null)
    );
  }

  setStateFilter(state) {
    if (state) {
      // filter down to current state
      const filteredResults = this.state.queryResults.filter(
        (a) => a.state === state
      );
      this.setState({
        filteredQueryResults: filteredResults,
        stateFilter: state,
        currentPage: 1,
        totalPages: Math.ceil(filteredResults.length / this.state.pageSize),
      });
    } else {
      // disable filter
      this.setState({
        filteredQueryResults: this.state.queryResults,
        stateFilter: "null",
        currentPage: 1,
        totalPages: Math.ceil(
          this.state.queryResults.length / this.state.pageSize
        ),
      });
    }
  }

  handleSearch(event) {
    if (event) {
      event.preventDefault();
    }
    // parse query
    try {
      function getQueryWords(query) {
        if (typeof query === "string") {
          return [query];
        } else {
          return getQueryWords(query["operand1"]).concat(
            getQueryWords(query["operand2"])
          );
        }
      }
      const searchQuery = SearchParser.parse(this.state.searchQuery);
      // parse down to just the words being searched for, for highlighting
      const searchQueryWords = getQueryWords(searchQuery["query"]);
      Api.getResearcherSearchResults(searchQuery).then((resp) => {
        // remove cities that had 0 results
        const respFilter = resp.filter((res) => res.sentences.length > 0);
        // sort based on city name
        respFilter.sort((a, b) => {
          if (a.name < b.name) {
            return -1;
          }
          if (a.name > b.name) {
            return 1;
          }
          return 0;
        });
        // parse states out
        const respStates = [...new Set(respFilter.map((a) => a.state))];
        this.setState({
          queryResults: respFilter,
          filteredQueryResults: respFilter,
          queryResultStates: respStates,
          searchQueryError: null,
          searchQueryWords: searchQueryWords,
          stateFilter: "null",
          totalPages: Math.ceil(respFilter.length / this.state.pageSize),
        });
      });
      // set search query param
      this.props.history.push({
        pathname: routes.researchers,
        search:
          "?" +
          new URLSearchParams({ search: this.state.searchQuery }).toString(),
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
    const queryParams = QueryString.parse(this.props.location.search);
    // if search already set, use it
    if (queryParams.search) {
      this.setSearchQuery(queryParams.search, true);
    }
  }

  render() {
    return (
      <div className="row mt-3">
        <div className="col-lg-12">
          <div className="col-md-6 col-md-offset-3">
            <form onSubmit={(e) => this.handleSearch(e)}>
              <div className="input-group">
                <input
                  type="text"
                  className={`form-control input-lg ${
                    this.state.searchQueryError ? "border-danger" : ""
                  }`}
                  placeholder="Search Query..."
                  value={this.state.searchQuery}
                  onChange={(event) =>
                    this.setSearchQuery(event.target.value, false)
                  }
                />
                <div className="input-group-addon">
                  <button
                    className="btn btn-sm btn-outline-primary"
                    type="submit"
                  >
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
          </div>
        </div>
        <div className="col-lg-12 mt-3">
          <div className="col-md-6 col-md-offset-3 text-center">
            <div className="btn-group" role="group" aria-label="...">
              <button
                type="button"
                onClick={() => this.setSearchQuery("file", true)}
                className="btn btn-info btn-rounded mr-2"
              >
                file
              </button>
              <button
                type="button"
                onClick={() => this.setSearchQuery("interview", true)}
                className="btn btn-info btn-rounded mr-2"
              >
                interview
              </button>
              <button
                type="button"
                onClick={() => this.setSearchQuery("arbitration", true)}
                className="btn btn-info btn-rounded mr-2"
              >
                arbitration
              </button>
              <button
                type="button"
                onClick={() => this.setSearchQuery("review", true)}
                className="btn btn-info btn-rounded mr-2"
              >
                review
              </button>
              <button
                type="button"
                onClick={() => this.setSearchQuery("investigation", true)}
                className="btn btn-info btn-rounded"
              >
                investigation
              </button>
            </div>
          </div>
        </div>
        {this.state.filteredQueryResults && (
          <div>
            {this.state.queryResultStates && (
              <div className="col-lg-12 mt-3">
                <div className="col-md-3">
                  <div className="input-group">
                    <select
                      className="form-control"
                      value={this.state.stateFilter}
                      onChange={(e) => this.setStateFilter(e.target.value)}
                    >
                      <option value="null" disabled>
                        Filter by State
                      </option>
                      {this.state.queryResultStates.map((result) => (
                        <option key={result}>{result}</option>
                      ))}
                    </select>
                    <span className="input-group-btn">
                      <button
                        className="btn btn-default"
                        type="button"
                        onClick={() => this.setStateFilter()}
                      >
                        <FontAwesomeIcon icon={faTimes} />
                      </button>
                    </span>
                  </div>
                </div>
                <div className="col-md-3">
                  <select
                    className="form-control"
                    defaultValue="null"
                    onChange={(e) => this.setPageSize(e.target.value)}
                  >
                    <option value="null" disabled>
                      Results per Page
                    </option>
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                  </select>
                </div>
              </div>
            )}
            <div className="col-lg-12 mt-3" id="results">
              <h2>Results</h2>
              <hr className="my-4 border-top border-secondary" />
              {this.state.queryResults && (
                <h4>{this.state.queryResults.length} Results found!</h4>
              )}
            </div>
            <div className="col-lg-12 mt-3">
              {this.state.filteredQueryResults.length === 0 && (
                <p className="text-center lead">
                  Sorry, it appears there are no results for this search!
                </p>
              )}
              {this.state.filteredQueryResults
                .slice(
                  this.state.pageSize * (this.state.currentPage - 1),
                  this.state.pageSize * this.state.currentPage
                )
                .map((result) => (
                  <ResearcherResult
                    result={result}
                    searchQueryWords={this.state.searchQueryWords}
                    key={result.id}
                  />
                ))}
              {this.state.filteredQueryResults.length > 0 && (
                <div className="col-lg-12 text-center">
                  <nav aria-label="Result navigation">
                    <ul className="pagination pagination-lg">
                      {this.state.currentPage - 1 > 0 && (
                        <li>
                          <a
                            aria-label="Previous"
                            onClick={() =>
                              this.setPage(this.state.currentPage - 1)
                            }
                          >
                            <span aria-hidden="true">&laquo;</span>
                          </a>
                        </li>
                      )}
                      {this.state.currentPage - 2 > 0 && (
                        <li
                          onClick={() =>
                            this.setPage(this.state.currentPage - 2)
                          }
                        >
                          <a>{this.state.currentPage - 2}</a>
                        </li>
                      )}
                      {this.state.currentPage - 1 > 0 && (
                        <li
                          onClick={() =>
                            this.setPage(this.state.currentPage - 1)
                          }
                        >
                          <a>{this.state.currentPage - 1}</a>
                        </li>
                      )}
                      <li className="active">
                        <span>{this.state.currentPage}</span>
                      </li>
                      {this.state.currentPage + 1 <= this.state.totalPages && (
                        <li
                          onClick={() =>
                            this.setPage(this.state.currentPage + 1)
                          }
                        >
                          <a>{this.state.currentPage + 1}</a>
                        </li>
                      )}
                      {this.state.currentPage + 2 <= this.state.totalPages && (
                        <li
                          onClick={() =>
                            this.setPage(this.state.currentPage + 2)
                          }
                        >
                          <a>{this.state.currentPage + 2}</a>
                        </li>
                      )}
                      {this.state.currentPage + 1 <= this.state.totalPages && (
                        <li>
                          <a
                            aria-label="Next"
                            onClick={() =>
                              this.setPage(this.state.currentPage + 1)
                            }
                          >
                            <span aria-hidden="true">&raquo;</span>
                          </a>
                        </li>
                      )}
                    </ul>
                  </nav>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }
}
export default Researchers;
