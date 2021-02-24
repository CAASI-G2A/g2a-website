import React, { Component } from "react";

class About extends Component {
	render() {
		return (
			<div>
			<div style={{padding:"5px"}}></div>

			<h1 style={{paddingTop:"20px",paddingLeft:"5px",textAlign:"center"}}>About P<span style={{color:"#5685d1"}}>x</span>PUC</h1>


			<div className="jumbotron" style={{paddingBottom:"25px"}}>

			    <p className="lead">The P<span style={{color:"#5685d1"}}>x</span>PUC team is made up of a subset of members from Grief to Action (G2A) , a working group at the University of Pittsburgh's Center for Analytical Approaches. </p>
			    <p className="lead">Our team is made up of students, staff, and community members who came together this summer in the wake of George Floyd's murder to use data analysis to address structural racism in Pittsburgh and beyond.</p>

			</div>

			<div className="jumbotron" style={{backgroundColor:"white",paddingTop:"0px"}}>
			  <hr className="my-4" style={{borderTop:"1px solid darkgrey"}} />
			<p className="lead">The aim of this project is to analyze police union contracts and the barriers they pose to holding police officers accountable, as well as to demystify the police misconduct investigation process.</p>
			<p className="lead">Our search tool allows users to easily look up information in these contracts, and helps them to become more familiar with some of the problematic language used within them and break this information down.</p>
			<hr className="my-4" style={{borderTop:"1px solid darkgrey"}} />
			</div>

			</div>
		);
	}
}
export default About;
