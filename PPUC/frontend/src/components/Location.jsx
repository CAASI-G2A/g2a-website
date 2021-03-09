import React, { Component } from "react";
import Api from "../libs/api";

class Location extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: null,
      contract: null,
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
  }

  render() {
    return (
      <div>
        {this.state.location && (
          <div className="jumbotron">
            <div className="row">
              <div className="col-md-9">
                <h1>{this.state.location.name} Contract</h1>
              </div>
            </div>
            <div className="row">
              <a
                className="btn btn-primary float-right"
                href={Api.ENDPOINTS.getLocationContractFile(
                  this.state.location.id,
                  "pdf"
                )}
                download
              >
                <span className="font-weight-bold">Download PDF </span>
                <i className="fas fa-file-download"></i>
              </a>
              <a
                className="btn btn-primary float-right mr-2"
                href={Api.ENDPOINTS.getLocationContractFile(
                  this.state.location.id,
                  "txt"
                )}
                download
              >
                <span className="font-weight-bold">Download TXT </span>
                <i className="fas fa-file-download"></i>
              </a>
            </div>
          </div>
        )}
        {this.state.contract && (
          <div className="row">
            <div className="col-md-12 bg-light p-3 border border-dark rounded">
              {this.state.contract.text.map((line) => (
                <p>{line}</p>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }
}
export default Location;
