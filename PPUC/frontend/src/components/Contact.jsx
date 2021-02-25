import React, { Component } from "react";

class Contact extends Component {
  render() {
    return (
      <div>
        <div style={{ padding: "5px" }}></div>

        <h1
          style={{
            paddingTop: "20px",
            paddingLeft: "5px",
            textAlign: "center",
          }}
        >
          Contact Us
        </h1>

        <div
          className="jumbotron"
          style={{ backgroundColor: "white", paddingTop: "10px" }}
        >
          <hr className="my-4" style={{ borderTop: "1px solid darkgrey" }} />
          <p className="lead" style={{ textAlign: "center" }}>
            Feel free to e-mail us with any questions or inquiries. We're happy
            to help!
          </p>
          <address className="text-center">
            <strong>General:</strong>{" "}
            <a href="mailto:iph34@pitt.edu">iph3@pitt.edu</a>
            <br />
          </address>
          <address className="text-center">
            <strong>Tech Support:</strong>{" "}
            <a href="mailto:cjk94@pitt.edu">cjk94@pitt.edu</a>
            <br />
          </address>
          <hr className="my-4" style={{ borderTop: "1px solid darkgrey" }} />
        </div>
      </div>
    );
  }
}
export default Contact;
