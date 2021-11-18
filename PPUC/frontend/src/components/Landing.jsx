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
          <hr style={{ borderTop: "1px solid white" }} />
          <p className="lead" style={{ marginTop: '-0.8rem', color: "white", fontSize: '2rem', fontWeight: 600 }}>
            Allegheny County Policing Project
            <div style={{ marginTop: '-0.7rem', fontSize: '1.2rem', fontStyle: 'italic', fontWeight: 300 }}>Bringing more transparency to policing in Allegheny County.</div>
          </p>
        </div>
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
        <hr class="my-4" />
        <div
          className="jumbotron"
          style={{ backgroundColor: "white", padding: "5px 30px", fontSize: '1.1rem' }}
        >
          <div>
            <i>"TAMV is excited that this project is being kicked off. 
            Huge thanks to Grief To Action for listening to our call and responding. 
            Being able to collect data on local police departments will be helpful 
            for our organizing and mobilizing efforts. In addition, it helps that 
            the focus is on the county and not just Pittsburgh. There is an overwhelming 
            need to focus on more of these small departments especially 
            from a data standpoint"</i>  <b>Fawn Montgomery, Take Action Mon Valley</b>
          </div>
          <br />
          <div>
            <i>"This project is an extraordinary contribution to our region’s police reform efforts. 
              The breadth and depth of the search capabilities into specific provisions within 
              collective bargaining agreements is astonishing. As a civil rights lawyer 
              who advises activist groups on police reform efforts and who frequently analyzes police 
              contracts, this project is a game-changer for social and racial justice in policing. 
              I look forward to seeing the practical impact of the search tool on equitable police practices 
              throughout the region."</i>  <b> Jerry S. Dickinson, Esq. Associate Professor, University of Pittsburgh School of Law</b>
          </div>
          <div>
            <i>Endorsement from Campaign Zero from yesterday's meeting: "“Campaign Zero, specifically 
              the Nix the 6 campaign are elated to see Grief to Action ACPP launch this project. 
              Making police union contract data public is necessary to empower the community at large 
              to combat systemic issues in policing.”</i> <b>Kat McKelvey, Campaign Zero</b>
          </div>
        </div>
      </div>
    );
  }
}
export default Landing;
