import React, { Component } from "react";
import { Link } from "react-router-dom";
import Highlighter from "react-highlight-words";
import routes from "../routes";

class ResearcherResultSentence extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
    };
    this.handleExpandedToggle = this.handleExpandedToggle.bind(this);
  }

  handleExpandedToggle() {
    this.setState({
      expanded: !this.state.expanded,
    });
  }

  render() {
    return (
      <p className={`lead ${!this.state.expanded ? "text-truncate" : ""}`}>
        <span onClick={() => this.handleExpandedToggle()}>
          <i className="fas fa-chevron-right"></i>{" "}
        </span>
        <Highlighter
          highlightClassName="font-weight-bold bg-light px-0 "
          searchWords={this.props.searchQueryWords}
          autoEscape={true}
          textToHighlight={this.props.sentence.text}
        />
      </p>
    );
  }
}

class ResearcherResult extends Component {
  render() {
    return (
      <div className="row bg-light p-3 border border-dark rounded mb-2">
        <div className="col-md-2">
          <h3>
            <Link to={`${routes.location}/${this.props.result.id}`}>
              {this.props.result.name}
            </Link>
          </h3>
        </div>
        <div className="col-md-10">
          {this.props.result.sentences.slice(0, 3).map((sentence) => (
            <ResearcherResultSentence
              searchQueryWords={this.props.searchQueryWords}
              sentence={sentence}
              key={sentence.id}
            />
          ))}
          {this.props.result.sentences.length - 3 > 0 && (
            <a
              className="text-decoration-none float-right lead"
              data-toggle="collapse"
              aria-expanded="false"
              href={`#sentences${this.props.result.id}`}
              aria-controls={`sentences${this.props.result.id}`}
            >
              {this.props.result.sentences.length - 3} more sentences
            </a>
          )}
        </div>
        <div
          className="col-md-offset-2 col-md-10 collapse"
          id={`sentences${this.props.result.id}`}
        >
          {this.props.result.sentences.slice(3).map((sentence) => (
            <ResearcherResultSentence
              searchQueryWords={this.props.searchQueryWords}
              sentence={sentence}
              key={sentence.id}
            />
          ))}
        </div>
      </div>
    );
  }
}
export default ResearcherResult;
