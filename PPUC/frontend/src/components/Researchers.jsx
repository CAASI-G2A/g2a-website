import React, { Component } from "react";
import * as d3 from "d3";
import d3tooltip from "d3-tooltip";
import QueryString from "query-string";
import * as scrollToElement from "scroll-to-element";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faTimes } from "@fortawesome/free-solid-svg-icons";
import Api from "../libs/api";
import SearchParser from "../libs/researcher_search_lang";
import routes from "../routes";
import ResearcherResult from "./ResearcherResult";
import heatMapData from "../../../PxPUC/static/app/researcher_heatmap_data.json";

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
    this.svg = React.createRef();
    this.svgHeatmap = React.createRef();
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
    this.renderPieChart();
    this.renderHeatmap();
    const queryParams = QueryString.parse(this.props.location.search);
    // if search already set, use it
    if (queryParams.search) {
      this.setSearchQuery(queryParams.search, true);
    }
  }

  renderPieChart() {
    const width = 250,
      height = 250,
      margin = 10;

    let canvas = d3
      .select(this.svg.current)
      .append("g")
      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    console.log("canvas: ", canvas);

    // The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
    var radius = Math.min(width, height) / 2 - margin;

    // Data here
    var data = [
      {
        category: "Gives officers Unfair Access to Information 17.5%",
        ratio: 17.5,
      },
      { category: "Restricts/Delays Interrogations 20%", ratio: 20 },
      { category: "Limits Oversight/Discipline 11.9%", ratio: 11.9 },
      { category: "Erases misconduct Record 11.8%", ratio: 11.8 },
      { category: "Disqualifies Complaints 2.8%", ratio: 2.8 },
    ];

    var color = d3
      .scaleOrdinal()
      .domain(data.map((d) => d.category))
      .range(d3.schemeSet2);

    // Compute the position of each group on the pie:
    var pie = d3.pie().value(function (d) {
      return d.ratio;
    });
    var data_ready = pie(data);
    // Now I know that group A goes from 0 degrees to x degrees and so on.

    // shape helper to build arcs:
    var arcGenerator = d3.arc().innerRadius(0).outerRadius(radius);

    console.log("data_ready: ", data_ready);

    // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
    canvas
      .selectAll(".slice")
      .data(data_ready)
      .enter()
      .append("path")
      .attr("class", "slice")
      .attr("d", arcGenerator)
      .attr("fill", function (d) {
        return color(d.data.category);
      })
      .attr("stroke", "black")
      .style("stroke-width", "2px")
      .style("opacity", 0.7);

    // Now add the annotation. Use the centroid method to get the best coordinates
    canvas
      .selectAll(".slice_text")
      .data(data_ready)
      .enter()
      .append("text")
      .attr("class", "slice_text")
      .text(function (d) {
        return d.data.category;
      })
      .attr("transform", function (d) {
        return "translate(" + arcGenerator.centroid(d) + ")";
      })
      .style("text-anchor", "middle")
      .style("font-size", 13);
  }

  renderHeatmap() {
    const tooltip = d3tooltip(d3);

    const width = 250,
      height = 250,
      margin = 10;

    let canvas = d3
      .select(this.svgHeatmap.current)
      .append("g")
      .attr("transform", "translate(" + 100 + "," + margin * 3 + ")");

    const data = heatMapData;

    // Build X scales and axis:
    var x = d3
      .scaleBand()
      .range([0, width])
      .domain(data.map((d) => d.City))
      .padding(0.05);

    canvas
      .append("g")
      .style("font-size", 12)
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x).tickSize(0))
      .select(".domain")
      .remove();

    // Build Y scales and axis:
    var y = d3
      .scaleBand()
      .range([height, 0])
      .domain(data.map((d) => d.Problem))
      .padding(0.05);

    var yAxis = canvas
      .append("g")
      .style("font-size", 12)
      .call(d3.axisLeft(y).tickSize(0));

    yAxis.selectAll("text").attr("transform", "translate(-5,0)rotate(-45)");

    yAxis.select(".domain").remove();

    // Build color scale
    var myColor = d3
      .scaleSequential()
      .interpolator(d3.interpolateInferno)
      .domain([1, 100]);

    // add the squares
    canvas
      .selectAll()
      .data(data)
      .enter()
      .append("rect")
      .attr("x", function (d) {
        return x(d.City);
      })
      .attr("y", function (d) {
        return y(d.Problem);
      })
      .attr("rx", 4)
      .attr("ry", 4)
      .attr("width", x.bandwidth())
      .attr("height", y.bandwidth())
      .style("fill", function (d) {
        return myColor(d.Contracts);
      })
      .style("stroke-width", 4)
      .style("stroke", "none")
      .style("opacity", 0.8)
      .on("mouseover", (d, i) => {
        const htmlForInput = "<div># of contracts: " + d.Contracts + "</div>";
        tooltip.html(htmlForInput);
        tooltip.show();
      })
      .on("mouseout", (d, i) => {
        tooltip.hide();
      });
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
        <div class="col-lg-12 mt-3">
          <div class="col-lg-12 d-flex">
            <div class="problematic-language-intro jumbotron">
              <h2 class="w3-padding-32">
                Police union contracts make it more difficult to hold police
                officers accountable for misconduct.
              </h2>
              <p class="w3-text-grey">
                Police union contracts contain key information on the internal
                processes of police bureaus. However, they are often hard to
                find and contain confusing language. There needs to be more
                transparency in these documents and what they actually say. We
                aim to not only provide actual contract documents but also to
                highlight critical problematic phrasing that limits
                accountability in police unions.
              </p>
              <div class="jumbotron d-flex">
                <p class="col-md-7">
                  <p class="w3-text-grey">
                    <i>
                      "No police officer shall be compelled by the City to be
                      interviewed by and/or to testify before the Citizen Police
                      Review Board. Any statements compelled by the City under
                      the Garrity Rule during internal investigations are
                      confidential and not subject to discovery or release to
                      the Citizens Police Review Board." (Sec 21 C)
                    </i>
                  </p>

                  <p class="w3-text-grey">
                    <b>Translation:</b> the city does not require officers to
                    cooperate with the CPRB during the complaint process and
                    they keep their internal review completely confidential from
                    the review board.
                  </p>
                </p>
                <p class="col-md-5">
                  <img
                    src="/static/app/img/researcher_introduction.jpg"
                    width="100%"
                  />
                </p>
              </div>
              <p class="w3-text-grey">
                Policing in the US is highly fragmented with more than 100
                police departments in Allegheny County alone. Contracts are
                opaque and negotiated borough by borough, leading to confusion
                and distrust in local government.
              </p>
            </div>
          </div>

          <div class="problematic-language-stat jumbotron d-flex">
            <div class="col-md-8">
              <h3 class="w3-padding-32">Complaint Statistics</h3>
              <p class="w3-text-grey">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Excepteur sint occaecat
                cupidatat non proident, sunt in culpa qui officia deserunt
                mollit anim id est laborum consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </p>
            </div>
            <div class="col-md-4">
              <svg
                className="svg-pie-chart"
                ref={this.svg}
                width={"100%"}
                height={300}
              />
            </div>
          </div>
          <div class="problematic-language-category jumbotron">
            <h3 class="w3-padding-32">Problematic Provisions</h3>
            <table>
              <tr>
                <th>Problematic Provision</th>
                <th>Definition</th>
              </tr>
              <tr>
                <td>
                  Delays Interrogations of Officers Suspected of Misconduct
                </td>
                <td>
                  The contract includes any stipulation that delays officer
                  interviews or interrogations after alleged wrongdoing for a
                  set length of time (for exmaple, two days or twenty-four
                  hours).
                </td>
              </tr>
              <tr>
                <td>Provides Access to Evidence Before Interview</td>
                <td>
                  The contract provides officers with access to evidence before
                  interviews or interrogations about alleged wrongdoing (for
                  example, complete investigative files or statements from other
                  witnesses).
                </td>
              </tr>
              <tr>
                <td>Limits Consideration of Disciplinary History</td>
                <td>
                  The contract mandates the destruction or purging of
                  disciplinary records from the personnel files after a set
                  length of time, or limits the consideration of disciplinary
                  records in future employment actions.
                </td>
              </tr>
              <tr>
                <td>
                  Limits Length of Investigation or Establishes Statute of
                  Limitations
                </td>
                <td>
                  The contract prohibits the interrogation, investigation, or
                  punishment of officers on the basis of alleged wrongdoing if
                  too much time has elapes since its alleged occurence, or since
                  the initiation of the investigation.
                </td>
              </tr>
              <tr>
                <td>Limits Anonymous Complaints</td>
                <td>
                  The contract prohibits supervisors from interrogating,
                  investigating, or discplining officers on the basis of
                  anonymous civilian complaints.
                </td>
              </tr>
              <tr>
                <td>Limits Civilian Oversight</td>
                <td>
                  The contract prohibits civilian groups from acquiring the
                  authority to investigate, discpline or terminate officers for
                  alleged wrongdoing.
                </td>
              </tr>
              <tr>
                <td>Permits or Requires Arbitration</td>
                <td>
                  The contract permits or requires arbitration of disputes
                  related to disciplinary penalites or termination.
                </td>
              </tr>
            </table>
          </div>
          <div class="problematic-language-stat jumbotron d-flex">
            <div class="col-md-8">
              <h3 class="w3-padding-32">
                Problematic Provisions by categories and states
              </h3>
              <p class="w3-text-grey">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Excepteur sint occaecat
                cupidatat non proident, sunt in culpa qui officia deserunt
                mollit anim id est laborum consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </p>
            </div>
            <div class="col-md-4">
              <svg
                className="svg-heatmap"
                ref={this.svgHeatmap}
                width={350}
                height={300}
              />
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
