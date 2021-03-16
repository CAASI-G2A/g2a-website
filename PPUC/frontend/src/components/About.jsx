import React, { Component } from "react";

class About extends Component {
  render() {
    return (
      <div>
        <h1 className="text-center pt-5 pl-2">
          About P<span style={{ color: "#5685d1" }}>x</span>PUC
        </h1>

        <div className="jumbotron pb-5">
          <p className="lead">
            The P<span style={{ color: "#5685d1" }}>x</span>PUC team is made up
            of a subset of members from Grief to Action (G2A) , a working group
            at the University of Pittsburgh's Center for Analytical Approaches.{" "}
          </p>
          <p className="lead">
            Our team is made up of students, staff, and community members who
            came together this summer in the wake of George Floyd's murder to
            use data analysis to address structural racism in Pittsburgh and
            beyond.
          </p>
        </div>

        <div className="jumbotron pt-0 bg-white">
          <hr className="my-4 border-top border-secondary" />
          <p className="lead">
            The aim of this project is to analyze police union contracts and the
            barriers they pose to holding police officers accountable, as well
            as to demystify the police misconduct investigation process.
          </p>
          <p className="lead">
            Our search tool allows users to easily look up information in these
            contracts, and helps them to become more familiar with some of the
            problematic language used within them and break this information
            down.
          </p>
          <hr className="my-4 border-top border-secondary" />
        </div>
      </div>
    );
  }
}
export default About;
