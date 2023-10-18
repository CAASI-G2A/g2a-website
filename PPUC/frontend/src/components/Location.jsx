import React, { Component } from "react";
import _ from 'lodash';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileDownload } from "@fortawesome/free-solid-svg-icons";
import { Tabs } from "antd";
import Api from "../libs/api";
import ReactPDF from "@intelllex/react-pdf";

import regionInfoData from "../data/merge_data_allegheny_map.json";
import _default from "rc-trigger";
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
      regionInfo: null,
      contract: null,
      contractPdf: null,
      problematicSentences: null,
    };
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
    const { TabPane } = Tabs;

    const regionInfo = this.state.location
      && (_.filter(regionInfoData, {'Police_Agency_Name': this.state.location.name}).length 
      ? _.filter(regionInfoData, {'Police_Agency_Name': this.state.location.name})[0]: null);

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
          {this.state.location && (<div className="offset-md-8 col-md-4">
            <h3 className="text-center">Overview</h3>
            <table className="table table-hover table-bordered">
              <tbody>
                <tr>
                  <th className="bg-light">Full time officers as of 2019</th>
                  {regionInfo ? <td className="align-middle">{regionInfo["2019_Full_Time_Police"]}</td> : <td className="align-middle">{"No info"}</td>}
                </tr>
                {/* <tr>
                  <th className="bg-light">Do they use a police bill of rights</th>
                  {regionInfo ? <td className="align-middle">{regionInfo["police_bill_of_rights"]}</td> : <td className="align-middle">{"No info"}</td>}
                </tr> */}
                <tr>
                  <th className="bg-light">Police budget percentage in 2019</th>
                  {regionInfo ? <td className="align-middle">{regionInfo["2019_Police_Budget_Percentage"]}</td> : <td className="align-middle">{"No info"}</td>}
                </tr>
                <tr>
                  <th className="bg-light">Police department website</th>
                  {regionInfo ? <td className="align-middle"><a href={regionInfo["Police_Department_Website"]}>Link</a></td> : <td className="align-middle">{"No info"}</td>}
                </tr>
              </tbody>
            </table>
          </div>)}
          <div className="offset-md-8 col-md-4" style={{ textAlign: 'right' }}>
            <a target="_blank" href="https://www.grietoaction.org/static/app/instructions/How_to_read_a_contract.pdf">Click for our brief “How to Read a Contract” guide</a>
          </div>
          {this.state.location && 
            (<Tabs defaultActiveKey="1" type="card" size={"large"}>
              <TabPane tab="pdf" key="1">
                <div className="pdf_viewer_wrapper col-md-12">
                  {this.state.location.hasPdf && (
                    <ReactPDF
                      url={Api.ENDPOINTS.getLocationContractPdf(
                        this.state.location.id
                      )}
                      showProgressBar
                      showToolbox
                    />
                  )}
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
            </Tabs>)}
        </div>
      </div>
    );
  }
}
export default Location;
