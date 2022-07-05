import React, { Component } from "react";

class Footer extends Component {
  render() {
    return (
      <footer>
        <p className="font-italic">
          The information you obtain at this site is not, nor is it intended to
          be, legal advice. The people who create and maintain this web site are
          not attorneys and the information here does not create an attorney
          client relationship. While we make every effort to remain up to date
          and comprehensive, the information provided is for informational
          purposes only and may not reflect the most current legal developments
          for all cases. To take legal action or to defend yourself in any
          individual case, you should consult an attorney for advice regarding
          your individual situation.
        </p>
        <div>
          <p>
            Want to cite this work? Use: Center for Analytical Approaches to Social Innovation, University of 
            Pittsburgh. Allegheny County Policing Project Contract Dataset 
            (last updated 2021-11-19). 
            <a href="https://www.grieftoaction.org/">https://www.grieftoaction.org/</a>
          </p>
        </div>
        <p>&copy; {new Date().getFullYear()} - CAASI From Grief to Action</p>
      </footer>
    );
  }
}
export default Footer;
