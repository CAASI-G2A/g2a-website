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
            backgroundImage: "url(/static/app/img/banner.jpg)",
            backgroundSize: "100%",
            paddingTop: "60px",
            paddingBottom: "90px",
            height: '150px'
          }}
        >
          {/* <img
            src="/static/app/img/CAASI2.png"
            style={{ width: "55px", paddingBottom: "14px", opacity: 0.9 }}
          />
          <h1 style={{ color: "white" }}>ACPP</h1> */}
          <hr style={{ borderTop: "1px solid white" }} />
          <p className="lead" style={{ marginTop: '-0.8rem', color: "white", fontSize: '2rem', fontWeight: 600 }}>
            Allegheny County Policing Project
            <div style={{ marginTop: '-0.7rem', fontSize: '1.2rem', fontStyle: 'italic', fontWeight: 300 }}>Bringing more transparency to policing in Allegheny County.</div>
          </p>
        </div>
        {/* <div
          className="jumbotron"
          style={{ backgroundColor: "white", padding: "5px 30px" }}
        >
          <p className="lead">
            <b>Bringing more transparency to policing in Allegheny County. </b><br />
            <i>
              Allegheny County Policing Project (ACPP) is an
              interdisciplinary working group at the University of PIttsburgh 
              using data science to identify and address racial injustice. 
              Our mission is to bring more transparency to policing in Allegheny County.
            </i>
          </p>
        </div> */}

        <hr className="my-4" />
        <div
          className="jumbotron"
          style={{
            padding: "2rem",
            backgroundColor: "white",
            borderLeft: "5px solid darkblue",
          }}
        >
          <p
            className="lead"
            style={{ fontSize: "1.5rem", fontWeight: 800, color: "darkblue" }}
          >
            What you can do on this website:
          </p>
          <div className="item1_map" style={{ display: "flex" }}>
            <div>
              <img
                src="/static/app/img/landing_icon_map.png"
                style={{ width: "80px", marginRight: "1rem" }}
              ></img>
            </div>
            <div style={{ paddingTop: "1rem" }}>
              <h5
                style={{
                  marginBottom: "0px",
                  color: "royalblue",
                  fontWeight: 700,
                }}
              >
                {" "}
                1) Explore&nbsp;
                <Link
                  to={routes.map}
                  style={{ color: "royalblue", fontWeight: 700 }}
                >
                  Police Department Map
                </Link>
              </h5>
              <p className="lead">
                Find your local and neighboring police department and learn
                about it.
              </p>
            </div>
          </div>
          <div className="item2_search" style={{ display: "flex" }}>
            <div>
              <img
                src="/static/app/img/landing_icon_search.png"
                style={{ width: "80px", marginRight: "1rem" }}
              ></img>
            </div>
            <div style={{ paddingTop: "1rem" }}>
              <h5
                style={{
                  marginBottom: "0px",
                  color: "royalblue",
                  fontWeight: 700,
                }}
              >
                <Link
                  to={routes.commentary}
                  style={{ color: "royalblue", fontWeight: 700 }}
                >
                  2) Search Police Contracts
                </Link>
              </h5>
              <p className="lead">
                Search and compare over 100 contracts from Allegheny County.
                Filter contracts by location.
              </p>
            </div>
          </div>
          <div className="item3_complaint" style={{ display: "flex" }}>
            <div>
              <img
                src="/static/app/img/landing_icon_complaint.png"
                style={{ width: "80px", marginRight: "1rem" }}
              ></img>
            </div>
            <div style={{ paddingTop: "1rem" }}>
              <h5 style={{ marginBottom: "0px" }}>
                <Link
                  to={routes.citizens}
                  style={{ color: "royalblue", fontWeight: 700 }}
                >
                  3) Pittsburgh Complaint FAQ
                </Link>
              </h5>
              <p className="lead">
                Learn about the process of filing a police misconduct complaint
                at Pittsburgh.
              </p>
            </div>
          </div>

          {/* <h5 style={{ marginBottom: "0px", color: 'royalblue', fontWeight: 700 }}>
            <Link to={routes.researchers} style={{ color: 'royalblue', fontWeight: 700 }}>2) Search Police Contracts</Link>
          </h5>
          <p className="lead">
            Search and compare over 100 contracts from Allegheny County. Filter
            contracts by location.
          </p>
          <h5 style={{ marginBottom: "0px" }}>
            <Link to={routes.researchers} style={{ color: 'royalblue', fontWeight: 700 }}>3) Pittsburgh Complaint FAQ</Link>
          </h5>
          <p className="lead">
            Learn about the process of filing a police misconduct complaint at
            Pittsburgh.
          </p> */}
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
      </div>
    );
  }
}
export default Landing;
