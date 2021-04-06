import React, { Component } from "react";

class CitizenInfoPanel extends Component {
  render() {
    return (
      <div id={this.props.id} className="card border-blue">
        <div className="card-header bg-blue font-weight-bold text-white">
          {this.props.stage.title}
        </div>
        <div
          className="card-body"
          dangerouslySetInnerHTML={{ __html: this.props.stage.content }}
        ></div>
        {this.props.stage.resources && (
          <div
            className="card-footer"
            dangerouslySetInnerHTML={{ __html: this.props.stage.resources }}
          ></div>
        )}
        <div className="card-header bg-blue font-weight-bold text-white">
          Frequently Asked Questions
        </div>
        <div className="pt-1" id="citizenInfoPanelAccordion">
          {this.props.questions &&
            this.props.questions.map((question) => (
              <div key={question.id} className="card card-default">
                <div className="card-header" role="tab" id="heading{{q.id}}">
                  <a
                    className="collapsed"
                    role="button"
                    data-toggle="collapse"
                    href={`#collapse${question.id}`}
                    aria-expanded="false"
                    aria-controls={`collapse${question.id}`}
                  >
                    {question.question}
                  </a>
                </div>
                <div
                  id={`collapse${question.id}`}
                  className="collapse"
                  aria-labelledby={`heading${question.id}`}
                  data-parent="#citizenInfoPanelAccordion"
                >
                  <div
                    className="card-body"
                    dangerouslySetInnerHTML={{ __html: question.answer }}
                  ></div>
                </div>
              </div>
            ))}
        </div>
      </div>
    );
  }
}
export default CitizenInfoPanel;
