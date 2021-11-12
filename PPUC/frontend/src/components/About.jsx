import React, { Component } from "react";
import { Card, Meta, Col, Row } from 'antd';

class About extends Component {  
  render() {
    const { Meta } = Card;

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
        {/* about the team */}
        <div class="meet-the-team-wrapper">
          <h2 class="text-center" style={{ marginBottom: 5 }}>Meet the Team</h2>
          <hr style={{ width: '10%', border: '3px solid darkblue', marginTop: 5, marginBottom: 40 }} />
          <Row gutter={[16, 24]}>
            <Col span={8}>
              <Card
                hoverable
                style={{ width: '70%', margin: '0 auto' }}
                cover={<img alt="example" src="/static/app/img/profiles/sera.png" />}
              >
                <Meta title="Sera Linardi" description="www.instagram.com" />
              </Card>
            </Col>
            <Col span={8}>
              <Card
                hoverable
                style={{ width: '70%', margin: '0 auto' }}
                cover={<img alt="example" src="/static/app/img/profiles/sera.png" />}
              >
                <Meta title="Europe Street beat" description="www.instagram.com" />
              </Card>
            </Col>
            <Col span={8}>
              <Card
                hoverable
                style={{ width: '70%', margin: '0 auto' }}
                cover={<img alt="example" src="/static/app/img/profiles/sera.png" />}
              >
                <Meta title="Europe Street beat" description="www.instagram.com" />
              </Card>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={8}>
              <Card
                hoverable
                style={{ width: '70%', margin: '0 auto' }}
                cover={<img alt="example" src="/static/app/img/profiles/sera.png" />}
              >
                <Meta title="Sera Linardi" description="www.instagram.com" />
              </Card>
            </Col>
            <Col span={8}>
              <Card
                hoverable
                style={{ width: '70%', margin: '0 auto' }}
                cover={<img alt="example" src="/static/app/img/profiles/sera.png" />}
              >
                <Meta title="Europe Street beat" description="www.instagram.com" />
              </Card>
            </Col>
            <Col span={8}>
              <Card
                hoverable
                style={{ width: '70%', margin: '0 auto' }}
                cover={<img alt="example" src="/static/app/img/profiles/sera.png" />}
              >
                <Meta title="Europe Street beat" description="www.instagram.com" />
              </Card>
            </Col>
          </Row>
          {/* <div class="meet-the-team-row row d-flex align-items-center">
            <div class="col-md-4 text-center">
              <div class="profile-img-wrapper">
                <img
                  src="/static/app/img/profiles/sera.png"
                  class="rounded-circle"
                  width="120"
                  height="120"
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
            </div>
            <div class="col-md-4 text-center">
              <div class="profile-img-wrapper">
                <img
                  src="/static/app/img/profiles/yuru.png"
                  class="rounded-circle"
                  width="120"
                  height="120"
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
              <div>Project Advisor</div>
            </div>
            <div class="col-md-4 text-center">
              <div class="profile-img-wrapper">
                <img
                  src="/static/app/img/profiles/mikaela.png"
                  class="rounded-circle"
                  width="120"
                  height="120"
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
            </div>
          </div> */}
          {/* <div class="meet-the-team-row row d-flex align-items-center">
            <div class="col-md-4 text-center">
              <div class="profile-img-wrapper">
                <img
                  src="/static/app/img/profiles/eliana.png"
                  class="rounded-circle"
                  width="120"
                  height="120"
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
            </div>
            <div class="col-md-4 text-center">
              <div class="profile-img-wrapper">
                <img
                  src="/static/app/img/profiles/profile_picture_placeholder.png"
                  class="rounded-circle"
                  width="120"
                  height="100"
                />
              </div>
              <div>
                <a
                  href="http://www.grieftoaction.org"
                  class="profile-name"
                  target="_blank"
                ></a>
              </div>
              <div>&emsp;&emsp;</div>
            </div>
            <div class="col-md-4 text-center">
              <div class="profile-img-wrapper">
                <img
                  src="/static/app/img/profiles/profile_picture_placeholder.png"
                  class="rounded-circle"
                  width="120"
                  height="100"
                />
              </div>
              <div>
                <a
                  href="http://www.grieftoaction.org"
                  class="profile-name"
                  target="_blank"
                ></a>
              </div>
              <div>&emsp;&emsp;</div>
            </div>
          </div> */}
        </div>
        <div class="partners-wrapper">
          <h2 class="text-center">Our Partners</h2>
          <hr class="my-4"></hr>
          <div class="partner-row row d-flex align-items-center">
            <div class="col-md-3 text-center">
              <a href="https://joincampaignzero.org" target="_blank">
                <img
                  src="/static/app/img/partner_camp_zero.jpg"
                  alt="Open Police"
                  width="100"
                />
              </a>
            </div>
            <div class="col-md-9">
              <h3>Campaign Zero</h3>
              <p>
                A comprehensive platform of research-based policy solutions to
                end police brutality in America.
              </p>
            </div>
          </div>
          <div class="partner-row row d-flex align-items-center">
            <div class="col-md-3 text-center">
              <a href="https://openpolice.org" target="_blank">
                <img
                  src="/static/app/img/partner_open_pol.jpg"
                  alt="Open Police"
                  width="200"
                />
              </a>
            </div>
            <div class="col-md-9">
              <h3>Open Police</h3>
              <p>
                Prepare, file, and track reports of police conduct because your
                story is too important to be ignored.
              </p>
            </div>
          </div>
          {/* <table class="col-md-12">
            <tr>
              <th colspan="4" class="text-center"><h2>Partners</h2></th>
            </tr>
            <tr rowspan="3">
              <td><a href="https://www.joincampaignzero.org" target="_blank"><img src="camp_zero.jpg" alt="Campaign Zero" width="80" height="80" /></a></td>
              <td>
                <h4>Campaign Zero</h4>
                <p>A comprehensive platform of research-based policy solutions to end police brutality in America.</p></td>
            </tr>
            <tr rowspan="3">
              <td><a href="https://openpolice.org" target="_blank"><img src="open_pol.jpg" alt="Open Police" width="120" height="60" /></a></td>
              <td>Open Police: Prepare, file, and track reports of police conduct because your story is too important to be ignored.</td>
            </tr>
            <tr rowspan="3">
              <td><a href="https://www.grieftoaction.org/PBB/" target="_blank"><img src="412conn.jpg" alt="412 Connect" width="100" height="60" /></a></td>
              <td>412 Connect: promote and increase the visibility of Black-owned businesses in Pittsburgh and to expand their business presence on and around the University of Pittsburgh campus and the Pittsburgh community.</td>
            </tr>
          </table> */}
        </div>
      </div>
    );
  }
}
export default About;
