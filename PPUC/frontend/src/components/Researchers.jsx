import React, { Component } from "react";
import Highlighter from "react-highlight-words";
import Api from "../libs/api";

class Researchers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      locations: [],
      searchQuery: "",
      queryResults: null,
    };
    this.setSearchQuery = this.setSearchQuery.bind(this);
	  this.setCityFilter = this.setCityFilter.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  setSearchQuery(newQuery) {
    this.setState({
      searchQuery: newQuery,
    }, () => this.handleSearch());
  }

	setCityFilter(city) {
	}

  handleSearch() {
    Api.getResearcherSearchResults(this.state.searchQuery).then((resp) => {
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
      this.setState({
        queryResults: respFilter,
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
		<div>
			<div className="col-lg-12 mt-3">
				<div className="dropdown">
					<button className="btn btn-default dropdown-toggle" type="button" id="cityFilterDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
						City
						<span className="caret"></span>
					</button>
					<ul className="dropdown-menu" aria-labelledby="cityFilterDropdown">
						{ this.state.queryResults.map(result => (
							<li key={result.id}><a onClick={() => this.setCityFilter(result)}>{result.name}</a></li>
					))}
					</ul>
				</div>
			</div>
			<div className="col-lg-12 mt-3">
				{this.state.queryResults.map((result) => (
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
							{ result.sentences.map(sentence => (
								<div key={sentence.id}>
									<p className="lead">
										<Highlighter
											highlightClassName="bg-warning"
											searchWords={[ this.state.searchQuery ]}
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
