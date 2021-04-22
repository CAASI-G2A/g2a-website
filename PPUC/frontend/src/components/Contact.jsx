import React, { Component } from "react";
import { Input, Form, FormGroup, Label, Button } from "reactstrap";

class Contact extends Component {
  render() {
    return (
      <div>
        <h1 className="text-center pt-5 pl-2">Contact Us</h1>

        <div className="jumbotron pt-2 bg-white">
          <hr className="my-4 border-top border-secondary" />
          <p className="lead text-center">
            Feel free to e-mail us with any questions or inquiries. We're happy
            to help!
          </p>
          <address className="text-center">
            <strong>General:</strong>
            <span>
              {" "}
              <a href="mailto:iph34@pitt.edu">iph3@pitt.edu</a>
            </span>
            <br />
          </address>
          <address className="text-center">
            <strong>Tech Support:</strong>
            <span>
              {" "}
              <a href="mailto:cjk94@pitt.edu">cjk94@pitt.edu</a>
            </span>
            <br />
          </address>
          <hr className="my-4 border-top border-secondary" />
        </div>
        <div class="contact-email-wrapper row jumbotron">
          <div class="contact-img-wrapper col-md-5 text-center">
            <img
              src="/static/app/img/contact_us.jpg"
              alt="Contact Us"
              width="90%"
            />
          </div>
          <div class="col-md-7">
            <Form>
              <FormGroup>
                <Label for="firstName">First Name</Label>
                <Input placeholder="First Name" />
              </FormGroup>
              <br />
              <FormGroup>
                <Label for="lastName">Last Name</Label>
                <Input placeholder="Last Name" />
              </FormGroup>
              <br />
              <FormGroup>
                <Label for="state">State</Label>
                <Input type="select" name="selectMulti" id="selectState">
                  <option value="pennsylvania">Pennsylvania</option>
                  <option value="new jersey">New Jersey</option>
                  <option value="ohio">Ohio</option>
                  <option value="florida">Florida</option>
                  <option value="kentucky">Kentucky</option>
                  <option value="california">California</option>
                  <option value="texas">Texas</option>
                  <option value="new york">New York</option>
                  <option value="wisconsin">Wisconsin</option>
                  <option value="arizona">Arizona</option>
                  <option value="delaware">Delaware</option>
                  <option value="illionois">Illionois</option>
                  <option value="north carolina">North Carolina</option>
                  <option value="south carolina">South Carolina</option>
                </Input>
              </FormGroup>
              <br />
              <FormGroup>
                <Label for="message">Message</Label>
                <Input
                  className="contact-message"
                  type="textarea"
                  name="message"
                  id="message"
                />
              </FormGroup>
              <Button className="contact-email-button">Submit</Button>
            </Form>
          </div>
        </div>

        {/* <div className="contactSection">
            <div className="contactCol">
              <img src="contactus.jpg" alt="Contact Us" width={300} height={350} /> 
            </div>
            <div className="contactCol">
              <form action="/action_page.php">
                <label htmlFor="fname">First Name</label>
                <input type="text" id="fname" name="firstname" placeholder="Your first name here.." />
                <label htmlFor="lname">Last Name</label>
                <input type="text" id="lname" name="lastname" placeholder="Your last name here.." />
                <label htmlFor="State">State</label>
                <select id="state" name="state">
                  <option value="pennsylvania">Pennsylvania</option>
                  <option value="new jersey">New Jersey</option>
                  <option value="ohio">Ohio</option>
                  <option value="florida">Florida</option>
                  <option value="kentucky">Kentucky</option>
                  <option value="california">California</option>
                  <option value="texas">Texas</option>
                  <option value="new york">New York</option>
                  <option value="wisconsin">Wisconsin</option>
                  <option value="arizona">Arizona</option>
                  <option value="delaware">Delaware</option>
                  <option value="illionois">Illionois</option>
                  <option value="north carolina">North Carolina</option>
                  <option value="south carolina">South Carolina</option>
                </select>
                <label htmlFor="country">Message</label>
                <label htmlFor="subject">.</label>
                <textarea id="subject" name="subject" placeholder="Leave your message" style={{height: '170px'}} defaultValue={""} />
                <input type="submit" defaultValue="Submit" />
                <button type="submit">Submit</button>
                <button type=" button" value="delete"
                onclick="deleteSomething()">Delete</button>
                <script>
              </form>
            </div>
          </div>
        </div> */}
      </div>
    );
  }
}
export default Contact;
