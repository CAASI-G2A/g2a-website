import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileDownload } from "@fortawesome/free-solid-svg-icons";
import { Tabs } from "antd";
import Api from "../libs/api";
import ReactPDF from "@intelllex/react-pdf";
class Location extends Component {
  constructor(props) {
    super(props);
    this.categories = {
      cityPayMisconduct: "Citys Pays for Misconduct",
      disqualifyComplaint: "Disqualifies Complaints",
      eraseMisconduct: "Erases Misconduct Records",
      limitOversight: "Limits Oversight",
      unfairInformation: "Gives Officer Unfair Access to Information",
    };
    this.state = {
      location: null,
      contract: null,
      problematicSentences: null,
      numPages: null,
      pageNumber: 1,
    };

    this.handleNumPages = this.handleNumPages.bind(this);
  }

  handleNumPages(numPages) {
    this.setState({
      numPages: numPages,
    });
  }

  componentDidMount() {
    // grab location id from request
    const { lid } = this.props.match.params;
    // make request for location specific data
    Api.getLocation(lid).then((resp) => {
      this.setState({
        location: resp,
      });
    });
    // make request for contract
    Api.getLocationContract(lid).then((resp) => {
      // split text lines
      resp.text = resp.text.split("\n");
      this.setState({
        contract: resp,
      });
    });
    // make request for problematic sentences
    Api.getLocationProblematicSentences(lid).then((resp) => {
      // go through list and assemble into more friendly dictionary
      let problematicSentences = {};
      for (let category of Object.keys(this.categories)) {
        problematicSentences[category] = [];
        for (let sentence of resp) {
          if (sentence[category] === true) {
            problematicSentences[category].push({
              text: sentence.text,
              impact: sentence.impact,
            });
          }
        }
      }
      this.setState({
        problematicSentences: problematicSentences,
      });
    });
  }

  render() {
    const options = {
      cMapUrl: "cmaps/",
      cMapPacked: true,
    };
    const { TabPane } = Tabs;

    console.log("I am rendering");
    return (
      <div>
        {this.state.location && (
          <div className="jumbotron">
            <div className="row">
              <div className="col-md-9">
                <h1>{this.state.location.name} Contract</h1>
              </div>
            </div>
            <div className="row justify-content-end">
              {this.state.location.hasPdf && (
                <a
                  className="btn btn-primary mr-2"
                  href={Api.ENDPOINTS.getLocationContractFile(
                    this.state.location.id,
                    "pdf"
                  )}
                  download
                >
                  <span className="font-weight-bold">Download PDF </span>
                  <FontAwesomeIcon icon={faFileDownload} />
                </a>
              )}
              {this.state.location.hasTxt && (
                <a
                  className="btn btn-primary mr-2"
                  href={Api.ENDPOINTS.getLocationContractFile(
                    this.state.location.id,
                    "txt"
                  )}
                  download
                >
                  <span className="font-weight-bold">Download TXT </span>
                  <FontAwesomeIcon icon={faFileDownload} />
                </a>
              )}
            </div>
          </div>
        )}
        <div className="row">
          <div className="offset-md-6 col-md-6">
            <h3 className="text-center">Summary</h3>
            <table className="table table-hover table-bordered">
              <tbody>
                <tr>
                  <th className="bg-light">City</th>
                  {this.state.location && <td>{this.state.location.name}</td>}
                  <th className="bg-light">State</th>
                  {this.state.location && <td>{this.state.location.state}</td>}
                </tr>
              </tbody>
            </table>
          </div>
          <div className="col-md-12">
            {/* <h2>Problematic Sentences</h2>
            <hr className="my-4 border-top border-secondary" />
            <ul className="nav nav-tabs" role="tablist">
              {Object.entries(this.categories).map(
                ([category, title], index) => (
                  <li key={category} role="presentation" className="nav-item">
                    <a
                      className={`${index === 0 ? "active" : ""} nav-link`}
                      href={`#${category}`}
                      aria-controls={category}
                      role="tab"
                      data-toggle="tab"
                    >
                      {title}
                    </a>
                  </li>
                )
              )}
            </ul> */}
            {/* <div className="tab-content">
              {Object.keys(this.categories).map((category, index) => (
                <div
                  key={category}
                  role="tabpanel"
                  className={`tab-pane ${index === 0 ? "active" : ""}`}
                  id={category}
                >
                  {this.state.problematicSentences &&
                    this.state.problematicSentences[category] &&
                    ((this.state.problematicSentences[category].length ===
                      0 && (
                      <p className="text-center">
                        No problematic sentences were identified by Campaign 0
                        as of June 29, 2016.
                      </p>
                    )) ||
                      this.state.problematicSentences[category].map(
                        (sentence, index) => (
                          <p key={index}>
                            <span className="font-weight-bold">Problem:</span>{" "}
                            {sentence.text}
                            <br />
                            <span className="font-weight-bold">
                              Impact:
                            </span>{" "}
                            {sentence.impact}
                          </p>
                        )
                      ))}
                </div>
              ))}
            </div> */}
          </div>
          <Tabs defaultActiveKey="1" type="card" size={"large"}>
            <TabPane tab="pdf" key="1">
              <div className="pdf_viewer_wrapper col-md-12">
                <ReactPDF
                  url="/static/app/img/pdf1.pdf"
                  showProgressBar
                  showToolbox
                />
              </div>
            </TabPane>
            <TabPane tab="text" key="2">
              {this.state.contract && (
                <div className="col-md-12">
                  <h2>Contract</h2>
                  <hr className="my-4 border-top border-secondary" />
                  {this.state.contract.text.map((line, index) => (
                    <p key={index}>{line}</p>
                  ))}
                </div>
              )}
            </TabPane>
          </Tabs>
        </div>
      </div>
    );
  }
}
export default Location;
