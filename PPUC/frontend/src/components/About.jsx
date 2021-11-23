import React, { Component } from "react";
import { Card, Meta, Col, Row } from 'antd';

class About extends Component {  
  render() {
    const { Meta } = Card;

    return (
      <div>
        {/* HEADING */}
        <h2 className="text-center pt-5 pl-2" style={{ fontWeight: 700, color: 'darkblue' }}>
          About ACPP
        </h2>
        {/* PRIMARY INTRO */}
        <div className="jumbotron pb-5">
          <p className="lead">
            The ACPP team is made up of a subset of members from Grief to Action (G2A), 
            a working group at the University of Pittsburgh's Center for Analytical Approaches in Social Innovation (CAASI). 
            Grief to Action started in the summer of 2020 in the wake of George Floyd's murder to 
            use data analysis to address structural racism in Pittsburgh and beyond.
            <br></br>
            The aim of this project is to bring more transparency to the police accountability process at 
            the local level. We hope this site allows users to navigate municipal police departments, 
            look up information in police contracts, and become more familiar with the ways these 
            contracts govern police accountability.
            {" "}
          </p>
          <p className="lead">
          Our team is made up of students, faculty, and community members. Almost a third of our 
          volunteers are from outside of Pitt. Email us to join forces!  We gratefully acknowledge 
          funding from the Pitt Cyber Accelerator Grant and the Pitt Momentum Fund, as well as the 
          contributions of Pitt’s CS1980, INFSCI 1740, and PIA 2096 capstone teams.
          </p>
        </div>
        {/* SECONDARY INTRO */}
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

        {/* ABOUT THE TEAM */}
        <div class="meet-the-team-wrapper">
          <h2 class="text-center" style={{ marginBottom: 5 }}>Meet the Team</h2>
          <hr style={{ width: '10%', border: '3px solid darkblue', marginTop: 5, marginBottom: 40 }} />
          <div class="meet-the-team-row row d-flex align-items-center">


            <div class="col-md-4 text-center  mb-2">
              <div class="profile-img-wrapper">
                <img
                  src="/static/app/img/profiles/sera.png"
                  class="rounded-circle"
                  width="120"
                  height="120"
                  style={{objectFit: "cover"}}
                />
              </div>
              <div>
                <a
                  href="http://www.linardi.gspia.pitt.edu/"
                  class="profile-name"
                  target="_blank"
                >
                  Sera Linardi
                </a>
              </div>
              <div>CAASI Director</div>
              <div><i>GSPIA Faculty</i></div>
            </div>

            <div class="col-md-4 text-center mb-2">
              <div class="profile-img-wrapper">
                <img
                  src="/static/app/img/profiles/mikaela.jpg"
                  class="rounded-circle"
                  width="120"
                  height="120"
                  style={{objectFit: "cover"}}
                />
              </div>
              <div>
                <a
                  href="http://www.grieftoaction.org"
                  class="profile-name"
                  target="_blank"
                >
                  Mikaela Chandler
                </a>
              </div>
              <div>Project Manager</div>
              <div><i>GSPIA MPA '22</i></div>
            </div>

            <div class="col-md-4 text-center mb-2">
              <div class="profile-img-wrapper">
                <img
                  src="/static/app/img/profiles/eliana.jpeg"
                  class="rounded-circle"
                  width="120"
                  height="120"
                  style={{objectFit: "cover"}}
                />
              </div>
              <div>
                <a
                  href="http://www.grieftoaction.org"
                  class="profile-name"
                  target="_blank"
                >
                  Eliana Beigel
                </a>
              </div>
              <div>Project Manager</div>
              <div><i>GSPIA MPA '22</i></div>
            </div>

            <div class="col-md-4 text-center mb-2">
              <div class="profile-img-wrapper">
                <img
                  src="/static/app/img/profiles/yuru.jpg"
                  class="rounded-circle"
                  width="120"
                  height="120"
                  style={{objectFit: "cover"}}
                />
              </div>
              <div>
                <a
                  href="http://www.yurulin.com"
                  class="profile-name"
                  target="_blank"
                >
                  Yu-Ru Lin
                </a>
              </div>
              <div>Faculty Advisor</div>
              <div><i>Pitt SCI Faculty</i></div>
            </div>

            <div class="col-md-4 text-center mb-2">
              <div class="profile-img-wrapper">
                <img
                  src="/static/app/img/profiles/bocar.jpg"
                  class="rounded-circle"
                  width="120"
                  height="120"
                  style={{objectFit: "cover"}}
                />
              </div>
              <div>
                <a
                  href="http://www.grieftoaction.org"
                  class="profile-name"
                  target="_blank"
                >
                  Bocar Ba
                </a>
              </div>
              <div>Faculty Advisor</div>
              <div><i>Duke Economics Faculty</i></div>
            </div>

            <div class="col-md-4 text-center mb-2">
              <div class="profile-img-wrapper">
                <img
                  src="/static/app/img/profiles/blair.jpeg"
                  class="rounded-circle"
                  width="120"
                  height="120"
                  style={{objectFit: "cover"}}
                />
              </div>
              <div>
                <a
                  href="http://www.grieftoaction.org"
                  class="profile-name"
                  target="_blank"
                >
                  Blair J. Mickles
                </a>
              </div>
              <div>Community Engagement</div>
              <div><i>MPIA + MSW</i></div>
            </div>

            <div class="col-md-4 text-center mb-2">
              <div class="profile-img-wrapper">
                <img

                  src="/static/app/img/profiles/ivy.jpg"
                  class="rounded-circle"
                  width="120"
                  height="120"
                  style={{objectFit: "cover"}}
                />
              </div>
              <div>
                <a
                  href="http://www.grieftoaction.org"
                  class="profile-name"
                  target="_blank"
                >
                  Ivy Chang
                </a>
              </div>
              <div>CAASI Communications Coordinator</div>
              <div><i>Pitt CBA Finance and DSAS Economics</i></div>
            </div>

            <div class="col-md-4 text-center mb-2">
              <div class="profile-img-wrapper">
                <img
                  src="/static/app/img/profiles/yongsu.jpg"
                  class="rounded-circle"
                  width="120"
                  height="120"
                  style={{objectFit: "cover"}}
                />
              </div>
              <div>
                <a
                  href="http://www.grieftoaction.org"
                  class="profile-name"
                  target="_blank"
                >
                  Yongsu Ahn
                </a>
              </div>
              <div>Technical Project Manager</div>
              <div><i>Pitt SCI Computer Science</i></div>
            </div>

            <div class="col-md-4 text-center mb-2">
              <div class="profile-img-wrapper">
                <img
                  src="/static/app/img/profiles/collin.png"
                  class="rounded-circle"
                  width="120"
                  height="120"
                  style={{objectFit: "cover"}}
                />
              </div>
              <div>
                <a
                  href="http://www.grieftoaction.org"
                  class="profile-name"
                  target="_blank"
                >
                  Collin Griffin
                </a>
              </div>
              <div>Technical Project Manager</div>
              <div><i>Pitt SCI Computer Science and DSAS Economics</i></div>
            </div>

            <div class="col-md-4 text-center mb-2">
              <div class="profile-img-wrapper">
                <img
                  src="/static/app/img/profiles/patrick.jpg"
                  class="rounded-circle"
                  width="120"
                  height="120"
                  style={{objectFit: "cover"}}
                />
              </div>
              <div>
                <a
                  href="http://www.grieftoaction.org"
                  class="profile-name"
                  target="_blank"
                >
                  Patrick Gavazzi
                </a>
              </div>
              <div>Technical Team</div>
              <div><i>Tufts Computer Science</i></div>
            </div>

            <div class="col-md-4 text-center mb-2">
              <div class="profile-img-wrapper">
                <img
                  src="/static/app/img/profiles/emmaline.jpg"
                  class="rounded-circle"
                  width="120"
                  height="120"
                  style={{objectFit: "cover"}}
                />
              </div>
              <div>
                <a
                  href="http://www.grieftoaction.org"
                  class="profile-name"
                  target="_blank"
                >
                  Emmaline Rial
                </a>
              </div>
              <div>Technical Team and Data Collection Team</div>
              <div><i>Mathematics and Computer Science</i></div>
            </div>

            <div class="col-md-4 text-center mb-2">
              <div class="profile-img-wrapper">
                <img
                  src="/static/app/img/profiles/eduardo.jpg"
                  class="rounded-circle"
                  width="120"
                  height="120"
                  style={{objectFit: "cover"}}
                />
              </div>
              <div>
                <a
                  href="http://www.grieftoaction.org"
                  class="profile-name"
                  target="_blank"
                >
                  Eduardo Solomo
                </a>
              </div>
              <div>Technical Team and Data Collection Team</div>
              <div><i>Housing and Data Policy</i></div>
            </div>

            <div class="col-md-4 text-center mb-2">
              <div class="profile-img-wrapper">
                <img

                  src="/static/app/img/profiles/tosan.png"
                  class="rounded-circle"
                  width="120"
                  height="120"
                  style={{objectFit: "cover"}}
                />
              </div>
              <div>
                <a
                  href="http://www.grieftoaction.org"
                  class="profile-name"
                  target="_blank"
                >
                  Tosan Adoki
                </a>
              </div>
              <div>Technical Team</div>
              <div><i>GSPIA, Urban Affairs and Planning</i></div>
            </div>

            <div class="col-md-4 text-center mb-2">
              <div class="profile-img-wrapper">
                <img

                  src="/static/app/img/profiles/noah.jpeg"
                  class="rounded-circle"
                  width="120"
                  height="120"
                  style={{objectFit: "cover"}}
                />
              </div>
              <div>
                <a
                  href="http://www.grieftoaction.org"
                  class="profile-name"
                  target="_blank"
                >
                  Noah Braun
                </a>
              </div>
              <div>Technical Team</div>
              <div><i>Technical Writer</i></div>
            </div>

            <div class="col-md-4 text-center mb-2">
              <div class="profile-img-wrapper">
                <img
                  src="/static/app/img/profiles/tom.jpg"
                  class="rounded-circle"
                  width="120"
                  height="120"
                  style={{objectFit: "cover"}}
                />
              </div>
              <div>
                <a
                  href="http://www.grieftoaction.org"
                  class="profile-name"
                  target="_blank"
                >
                  Tom Vielott
                </a>
              </div>
              <div>Data Collection Team</div>
              <div><i>Pitt GSPIA Alumnus</i></div>
            </div>

            <div class="col-md-4 text-center mb-2">
              <div class="profile-img-wrapper">
                <img
                  src="/static/app/img/profiles/adam.jpg"
                  class="rounded-circle"
                  width="120"
                  height="120"
                  style={{objectFit: "cover"}}
                />
              </div>
              <div>
                <a
                  href="http://www.grieftoaction.org"
                  class="profile-name"
                  target="_blank"
                >
                  Adam Nie
                </a>
              </div>
              <div>Development Team</div>
              <div><i>Pitt GSPIA MPA</i></div>
            </div>

            <div class="col-md-4 text-center mb-2">
              <div class="profile-img-wrapper">
                <img
                  src="/static/app/img/profiles/sean.jpg"
                  class="rounded-circle"
                  width="120"
                  height="120"
                  style={{objectFit: "cover"}}
                />
              </div>
              <div>
                <a
                  href="http://www.grieftoaction.org"
                  class="profile-name"
                  target="_blank"
                >
                  Sean Hudson
                </a>
              </div>
              <div>Data Collection Team</div>
              <div><i>Data Analyst</i></div>
            </div>

            <div class="col-md-4 text-center mb-2">
              <div class="profile-img-wrapper">
                <img
                  src="/static/app/img/profiles/kai.jpg"
                  class="rounded-circle"
                  width="120"
                  height="120"
                  style={{objectFit: "cover"}}
                />
              </div>
              <div>
                <a
                  href="http://www.grieftoaction.org"
                  class="profile-name"
                  target="_blank"
                >
                  Malachiah/Kai Koehler
                </a>
              </div>
              <div>Development Team</div>
              <div><i>Non-profit capacity building</i></div>
            </div>

            <div class="col-md-4 text-center mb-2">
              <div class="profile-img-wrapper">
                <img

                  src="/static/app/img/profiles/jessi.png"
                  class="rounded-circle"
                  width="120"
                  height="120"
                  style={{objectFit: "cover"}}
                />
              </div>
              <div>
                <a
                  href="http://www.grieftoaction.org"
                  class="profile-name"
                  target="_blank"
                >
                  Jessi DeFusco
                </a>
              </div>
              <div>Consultant</div>
              <div><i>Global Health Policy</i></div>
            </div>

          </div>
          
          {/* END PROFILE PICTURES */}

        </div>

        {/* BEGIN PARTNERS SECTION */}
        <div class="partners-wrapper mt-4">
          <h2 class="text-center">Our Partners</h2>
          <hr class="my-4"></hr>
          <div class="partner-row row d-flex align-items-center">
            <div class="col-md-3 text-center">
              <a href="https://joincampaignzero.org" target="_blank">
                <img
                  src="/static/app/img/campaign_zero.png"
                  alt="Campaign Zero"
                  width="200"
                />
              </a>
            </div>
            <div class="col-md-9">
              <h3>Campaign Zero</h3>
              <p>
              Campaign Zero encourages policymakers to focus on solutions 
              with the strongest evidence of effectiveness at reducing police violence.
              </p>
            </div>
          </div>

          <div class="partner-row row d-flex align-items-center">
            <div class="col-md-3 text-center">
              <a href="https://www.tamv.org" target="_blank">
                <img
                  src="/static/app/img/tamv_logo.png"
                  alt="Take Action Mon Valley Logo"
                  width="200"
                />
              </a>
            </div>
            <div class="col-md-9">
              <h3>Take Action Mon Valley</h3>
              <p>
              Take Action Mon Valley (TAMV) strives to equip communities with the necessary knowledge to leverage local grassroots community organizing.
              </p>
            </div>
          </div>
        </div>

        {/* RESOURCES */}
        <div class="partners-wrapper mt-4">
          <h2 class="text-center">Further Resources</h2>
          <hr class="my-4"></hr>
          <div class="partner-row row d-flex align-items-center">
            <div class="col-md-9">
              <h4><a href="https://apa-pgh.org/">Alliance for Police Accountability (APA)</a></h4>
              <p>
              Grassroots organization dedicated to criminal justice reconstruction, specializing in community/police relations
              </p>
            </div>
          </div>

          <div class="partner-row row d-flex align-items-center">
            <div class="col-md-9">
              <h4><a href="https://www.tamv.org/">Take Action Mon Valley (TAMV)</a></h4>
              <p>
              Equip communities with the necessary knowledge to leverage local grassroots community organizing
              </p>
            </div>
          </div>

          <div class="partner-row row d-flex align-items-center">
            <div class="col-md-9">
              <h4><a href="https://abolitionistlawcenter.org/">Abolitionist Law Center (ALC)</a></h4>
              <p>
              Public interest law firm inspired by the struggle of political and politicized prisoners, and organized for the purpose of abolishing class and race based mass incarceration
              </p>
            </div>
          </div>

          <div class="partner-row row d-flex align-items-center">
            <div class="col-md-9">
              <h4><a href="https://westendpower.org/">West End P.O.W.E.R</a></h4>
              <p>
              Community organization committed to strengthening communities through activism, advocacy, education, equity, and promoting unity
              </p>
            </div>
          </div>

          <div class="partner-row row d-flex align-items-center">
            <div class="col-md-9">
              <h4><a href="https://www.facebook.com/groups/200194701040816/">Black Lives Matter Pittsburgh</a></h4>
              <p>
              Focus is to bring together activists and allies in order to lift up black causes, speak out, and cross societal bridges
              </p>
            </div>
          </div>

          <div class="partner-row row d-flex align-items-center">
            <div class="col-md-9">
              <h4><a href="https://www.aclupa.org/en/chapters/greaterpittsburgh">American Civil Liberties Union (ACLU) Pittsburgh</a></h4>
              <p>
              Includes Allegheny, Armstrong, Beaver, Butler, Fayette, Greene, Indiana, Lawrence, Washington, and Westmoreland counties.
              </p>
            </div>
          </div>

        </div>

      </div>

    );
  }
}
export default About;
