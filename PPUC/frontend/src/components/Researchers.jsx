import React, { Component } from "react";
import Api from "../libs/api";

class Researchers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      locations: {},
      searchQuery: "",
      queryResults: null,
    };
    this.setSearchQuery = this.setSearchQuery.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  setSearchQuery(newQuery) {
    this.setState({
      searchQuery: newQuery,
    });
  }

  handleSearch() {
    Api.getResearcherSearchResults(this.state.searchQuery).then((resp) => {
      this.setState({
        queryResults: resp,
      });
    });
  }

  render() {
    return (
      <div className="row mt-3">
        <div className="col-lg-12">
          <div className="col-md-6 col-md-offset-3">
            <div className="input-group">
              <input
                type="text"
                className="form-control input-lg"
                placeholder="Search Query..."
                value={this.state.searchQuery}
                onChange={(event) => this.setSearchQuery(event.target.value)}
              />
              <div className="input-group-addon">
                <button
                  className="btn btn-sm btn-outline-primary"
                  onClick={() => this.handleSearch()}
                  type="submit"
                >
                  <i className="fas fa-search"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-12 mt-3">
          <div className="col-md-6 col-md-offset-3 text-center">
            <div className="btn-group" role="group" aria-label="...">
              <button
                type="button"
                onClick={() => this.setSearchQuery("file")}
                className="btn btn-info btn-rounded mr-2"
              >
                file
              </button>
              <button
                type="button"
                onClick={() => this.setSearchQuery("interview")}
                className="btn btn-info btn-rounded mr-2"
              >
                interview
              </button>
              <button
                type="button"
                onClick={() => this.setSearchQuery("arbitration")}
                className="btn btn-info btn-rounded mr-2"
              >
                arbitration
              </button>
              <button
                type="button"
                onClick={() => this.setSearchQuery("review")}
                className="btn btn-info btn-rounded mr-2"
              >
                review
              </button>
              <button
                type="button"
                onClick={() => this.setSearchQuery("investigation")}
                className="btn btn-info btn-rounded"
              >
                investigation
              </button>
            </div>
          </div>
        </div>
        {this.state.queryResults && (
          <div className="col-lg-12">
            {this.state.queryResults.map((result) => (
              <div>
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
                    {/*{obj.first}}<span class="bg-warning">{{obj.second}}</span>{{obj.third}*/}
                  </p>
                  <hr className="border border-secondary border-1" />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
}
export default Researchers;
