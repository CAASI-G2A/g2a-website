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
    if (this.props.collapsable) {
      this.setState({
        expanded: !this.state.expanded,
      });
    }
  }

  render() {
    return (
      <p
        className={`${
          !this.state.expanded && this.props.collapsable ? "text-truncate" : ""
        }`}
        onClick={() => this.handleExpandedToggle()}
      >
        {this.props.collapsable && (
          <span>
            <span className={`${!this.state.expanded ? "" : "d-none"}`}>
              <i className="fas fa-chevron-right"></i>{" "}
            </span>
            <span className={`${!this.state.expanded ? "d-none" : ""}`}>
              <i className="fas fa-chevron-down"></i>
            </span>
          </span>
        )}
        <Highlighter
          highlightClassName="font-weight-bold px-0 bg-transparent"
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
      <div>
        <div className="row mb-2">
          <div className="col-md-12">
            <h3>
              <Link to={`${routes.location}/${this.props.result.id}`}>
                {this.props.result.name}
              </Link>
            </h3>
          </div>
          <div className="col-md-12">
            <ResearcherResultSentence
              searchQueryWords={this.props.searchQueryWords}
              sentence={{
                text: this.props.result.sentences
                  .slice(0, 3)
                  .map((s) => s.text)
                  .join("\n"),
              }}
              key={this.props.result.sentences[0].id}
              collapsable={false}
            />
            {this.props.result.sentences.length - 3 > 0 && (
              <a
                className="text-decoration-none float-right"
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
            className="col-md-12 collapse"
            id={`sentences${this.props.result.id}`}
          >
            {this.props.result.sentences.slice(3).map((sentence) => (
              <ResearcherResultSentence
                searchQueryWords={this.props.searchQueryWords}
                sentence={sentence}
                key={sentence.id}
                collapsable={true}
              />
            ))}
          </div>
        </div>
        <hr className="my-4 border-top border-light-gray" />
      </div>
    );
  }
}
export default ResearcherResult;
