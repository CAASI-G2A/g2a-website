import React, { Component } from "react";
import { Link } from "react-router-dom";
import routes from "../routes";

class Landing extends Component {
  render() {
    return (
      <div>
        <div
          className="jumbotron"
          style={{
            backgroundImage: "url(https://i.imgur.com/jj0eBl5.jpg)",
            backgroundSize: "100%",
            paddingTop: "60px",
            paddingBottom: "90px",
          }}
        >
          <img
            src="/static/app/img/CAASI2.png"
            style={{ width: "55px", paddingBottom: "14px", opacity: 0.9 }}
          />
          <h1 style={{ color: "white" }}>ACPP</h1>
          <hr className="my-4" style={{ borderTop: "1px solid white" }} />
          <p className="lead" style={{ color: "white" }}>
            Allegheny County Policing Project
          </p>
        </div>
        <div
          className="jumbotron"
          style={{ backgroundColor: "white", padding: "5px 30px" }}
        >
          <p className="lead">
            <i>
              <b>Allegheny County Policing Project (ACPP)</b> is an
              interdisciplinary working group at the University of PIttsburgh
              dedicated to empowering marginalized communities through data
              science. Our mission is to bring more transparency in Allegheny
              County.
            </i>
          </p>
        </div>

        <hr className="my-4" />
        <div className="jumbotron" style={{ padding: "2rem" }}>
          <p className="lead">What you can do on this website:</p>
          <h4 style={{ marginBottom: "0px" }}>
            {" "}
            Explore &nbsp;
            <Link to={routes.map}>Police Dept Map</Link>
          </h4>
          <p className="lead">
            Find your local and neighboring police department and learn about
            it.
          </p>
          <h4 style={{ marginBottom: "0px" }}>
            <Link to={routes.commentary}>Search Police Contracts</Link>
          </h4>
          <p className="lead">
            Search and compare over 100 contracts from Allegheny County. Filter
            contracts by location.
          </p>
          <h4 style={{ marginBottom: "0px" }}>
            <Link to={routes.citizens}>Pittsburgh Complaint FAQ</Link>
          </h4>
          <p className="lead">
            Learn about the process of filing a police misconduct complaint at
            Pittsburgh.
          </p>
        </div>
        <div
          className="jumbotron"
          style={{ backgroundColor: "white", padding: "5px 30px" }}
        >
          <p className="lead">
            <b style={{ fontWeight: 600 }}>Why do we need these tools? </b>
            Data surrounding policing can be difficult for the public to access.
            This is especially true to Allegheny County due to the hyper
            fragmentation of all 130 municipalities which makes the process
            harder to navigate. Our tools consolidate information in
            easy-to-navigate ways for citizens, researchers, and activists
            interested in more police accountability in our country.
          </p>
        </div>
        <div className="jumbotron">
          <h4> Explore police contracts of Allegheny County</h4>
          <p className="lead">
            There are 108 separate governmental police departments operating in
            Allegheny County. This includes departments operating at the
            municipal, regional, county, and state level, from Stowe Township to
            the Pennsylvania State Troopers. We have gathered police contracts
            from almost 100 of these departments and made them publicly
            available to help make policing more transparent in the County.
          </p>
          <p className="lead">
            These contracts often contain controversial provisions that require
            cities to pay legal expenses for police officers accused of
            misconduct and make it more difficult to hold these officers
            accountable. From our preliminary analysis we found that nearly half
            of the contracts disqualify misconduct complaints from the public
            that are submitted anonymously, and nearly a third of contracts
            stipulate that when police officers are disciplined the municipality
            cannot release any information to the public about why discipline
            was imposed.
          </p>
          <p className="lead">
            We hope that this contract database will help concerned citizens
            learn more about police departments in Allegheny County and perhaps
            even help them advocate for change.
          </p>
        </div>
      </div>
    );
  }
}
export default Landing;
