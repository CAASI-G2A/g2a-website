import React, { Component } from "react";
import QueryString from "query-string";
import Highlighter from "react-highlight-words";
import Api from "../libs/api";
import SearchParser from "../libs/researcher_search_lang";
import routes from "../routes";

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
    };
    this.setSearchQuery = this.setSearchQuery.bind(this);
    this.setStateFilter = this.setStateFilter.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
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
      });
    } else {
      // disable filter
      this.setState({
        filteredQueryResults: this.state.queryResults,
        stateFilter: "null",
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
                    <i className="fas fa-search"></i>
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
            <div className="col-lg-12 mt-3">
              {this.state.queryResultStates && (
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
                        <i className="fas fa-times"></i>
                      </button>
                    </span>
                  </div>
                </div>
              )}
            </div>
            <div className="col-lg-12 mt-3">
              {this.state.filteredQueryResults.length === 0 && (
                <p className="text-center lead">
                  Sorry, it appears there are no results for this search!
                </p>
              )}
              {this.state.filteredQueryResults.map((result) => (
                <div key={result.id}>
                  <button
                    className="btn btn-block btn-lg btn-primary mb-3"
                    data-toggle="collapse"
                    data-target={`#collapse${result.id}`}
                    aria-expanded="false"
                    aria-controls={`collapse${result.id}`}
                  >
                    <span className="float-left">
                      {result.name} - {result.sentences.length} results
                    </span>
                    <i className="fas fa-chevron-down float-right"></i>
                  </button>
                  <div
                    className="collapse bg-light px-4"
                    id={`collapse${result.id}`}
                  >
                    <br />
                    <p className="lead">
                      <strong>
                        <a href="view_location">{result.name} Contract:</a>{" "}
                      </strong>
                    </p>
                    {result.sentences.map((sentence) => (
                      <div key={sentence.id}>
                        <p className="lead">
                          <Highlighter
                            highlightClassName="bg-warning"
                            searchWords={this.state.searchQueryWords}
                            autoEscape={true}
                            textToHighlight={sentence.text}
                          />
                        </p>
                        <hr className="border border-secondary border-1" />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }
}
export default Researchers;
