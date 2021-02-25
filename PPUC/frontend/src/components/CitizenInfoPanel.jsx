import React, { Component } from "react";

class CitizenInfoPanel extends Component {
  render() {
    return (
      <div className="panel panel-primary">
        <div className="panel-heading">
          <h3 className="panel-title">{this.props.title}</h3>
        </div>
        <div className="panel-body">{this.props.body}</div>
        <div className="panel-footer">{this.props.footer}</div>
        <div className="panel-heading">
          <h3 className="panel-title">{this.props.title2}</h3>
        </div>
        <div
          className="panel-group"
          style={{ paddingTop: "5px" }}
          id="citizenInfoPanelAccordion"
          role="tablist"
          aria-multiselectable="true"
        >
          {this.props.questions &&
            this.props.questions.map((question) => (
              <div className="panel panel-default">
                <div className="panel-heading" role="tab" id="heading{{q.id}}">
                  <h4 className="panel-title">
                    <a
                      className="collapsed"
                      role="button"
                      data-toggle="collapse"
                      data-parent="#citizenInfoPanelAccordion"
                      href="#collapse{ question.id }"
                      aria-expanded="false"
                      aria-controls="collapse{ question.id }"
                    >
                      {question.text}
                    </a>
                  </h4>
                </div>
                <div
                  id="collapse{ question.id }"
                  className="panel-collapse collapse"
                  role="tabpanel"
                  aria-labelledby="heading{ question.id }"
                >
                  <div className="panel-body">{question.answer}</div>
                </div>
              </div>
            ))}
        </div>
      </div>
    );
  }
}
export default CitizenInfoPanel;
