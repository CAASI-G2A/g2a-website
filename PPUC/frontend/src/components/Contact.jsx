import React, { Component } from "react";

class Contact extends Component {
  render() {
    return (
      <div>
        <h2 className="text-center pt-5 pl-2" style={{ color: 'darkblue', fontWeight: 700 }}>Contact Us</h2>

        <div className="jumbotron pt-2 bg-white">
          <hr className="my-4 border-top border-secondary" />
          <p className="lead text-center">
            Feel free to e-mail us with at <a href="mailto:caasi@pitt.edu">caasi@pitt.edu</a> with any questions or inquiries. We're happy
            to help!
          </p> 
          <hr className="my-4 border-top border-secondary" />
        </div>
      </div>
    );
  }
}
export default Contact;
