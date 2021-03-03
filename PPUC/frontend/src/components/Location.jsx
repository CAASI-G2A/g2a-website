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
      this.setState({
        contract: resp,
      });
    });
  }

  render() {
    return (
      <div className="jumbotron">
        <div className="row">
          {this.state.location && (
            <div className="col-md-9">
              <h1>{this.state.location.name} Police Contract</h1>
            </div>
          )}
        </div>
      </div>
    );
  }
}
export default Location;
