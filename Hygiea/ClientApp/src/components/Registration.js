import React from "react";
import "../styles/Registration.css";
import { Button } from "react-bootstrap";
import {
  Grid,
  Row,
  Col,
  ControlLabel,
  FormControl,
  FormGroup
} from "react-bootstrap";

class Registration extends React.Component {
  state = {
    credentials: {
      firstName: "",
      lastName: "",
      emailAddress: "",
      gender: "",
      phoneNumber: "",
      dateOfBirth: "",
      address: "",
      password: "",
      passwordRepeat: ""
    },
    student: {
      faculty: "",
      department: "",
      matricNumber: "",
      parentPhoneNumber: "",
      parentAddress: "",
      yearofEntry: ""
    },
    staff: {
      yearofEmployment: "",
      nextofKin: "",
      nextofKinAddress: "",
      nextofKinPhoneNumber: ""
    },
    AccountType: "student"
  };

  handleRegistration() {
    fetch("/api/user/register", {
      method: "POST",
      body: JSON.stringify(this.state),
      header: new Headers({
        ContentType: "application/json"
      })
    })
      .then(res => res.text())
      .then(data => {})
      .catch(err => alert("Error ocurred!"));

    console.log(this.state);
  }

  handleChange(event) {
    const obj = { ...this.state };

    if (event.target.name === "firstname") {
      obj.credentials.firstName = event.target.value;
    } else if (event.target.name === "lastname") {
      obj.credentials.lastName = event.target.value;
    } else if (event.target.name === "emailaddress") {
      obj.credentials.emailAddress = event.target.value;
    } else if (event.target.name === "gender") {
      obj.credentials.gender = event.target.value;
    } else if (event.target.name === "phonenumber") {
      obj.credentials.phoneNumber = event.target.value;
    } else if (event.target.name === "dateofbirth") {
      obj.credentials.dateOfBirth = event.target.value;
    } else if (event.target.name === "address") {
      obj.credentials.address = event.target.value;
    } else if (event.target.name === "faculty") {
      obj.student.faculty = event.target.value;
    } else if (event.target.name === "department") {
      obj.student.department = event.target.value;
    } else if (event.target.name === "matricnumber") {
      obj.student.matricNumber = event.target.value;
    } else if (event.target.name === "parentphonenumber") {
      obj.student.parentPhoneNumber = event.target.value;
    } else if (event.target.name === "parentaddress") {
      obj.student.parentAddress = event.target.value;
    } else if (event.target.name === "yearofentry") {
      obj.student.yearofEntry = event.target.value;
    } else if (event.target.name === "yearofemployment") {
      obj.staff.yearofEmployment = event.target.value;
    } else if (event.target.name === "nextofkin") {
      obj.staff.nextofKin = event.target.value;
    } else if (event.target.name === "nextofkinaddress") {
      obj.staff.nextofKinAddress = event.target.value;
    } else if (event.target.name === "nextofkinphonenumber") {
      obj.staff.nextofKinPhoneNumber = event.target.value;
    } else if (event.target.name === "accounttype") {
      obj.AccountType = event.target.value;
    }

    this.setState(obj);
  }

  renderstudentDetails() {
    return (
      <div>
        <Row>
          <Col xs={6} md={4}>
            <FormGroup>
              <ControlLabel>Matriculation Number</ControlLabel>
              <FormControl
                name="matricnumber"
                value={this.state.student.matricNumber}
                onChange={event => this.handleChange(event)}
                placeholder="Enter Matric Number"
              />
            </FormGroup>
          </Col>
          <Col xs={6} md={4}>
            <FormGroup>
              <ControlLabel>Year of Entry</ControlLabel>
              <FormControl
                name="yearofentry"
                value={this.state.student.yearofEntry}
                onChange={event => this.handleChange(event)}
                placeholder="Enter Year of Entry"
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col xs={6} md={4}>
            <FormGroup>
              <ControlLabel>Faculty</ControlLabel>
              <FormControl
                componentClass="select"
                name="faculty"
                value={this.state.student.faculty}
                onChange={event => this.handleChange(event)}
                placeholder="Select Faculty"
              >
                <option value="null">select an option</option>
                <option value="FACUS">Science</option>
                <option value="FAHUMMS">
                  Humanities, Management and Social Science
                </option>
              </FormControl>
            </FormGroup>
          </Col>
          <Col xs={6} md={4}>
            <FormGroup>
              <ControlLabel>Department</ControlLabel>
              <FormControl
                name="department"
                value={this.state.student.department}
                onChange={event => this.handleChange(event)}
                placeholder="Enter Department"
              />
            </FormGroup>
          </Col>
        </Row>

        <Row>
          <Col xs={6} md={10}>
            <FormGroup>
              <ControlLabel>Parent Address</ControlLabel>
              <FormControl
                componentClass="textarea"
                name="parentaddress"
                value={this.state.student.parentAddress}
                onChange={event => this.handleChange(event)}
                placeholder="Enter Parent Address"
              />
            </FormGroup>
          </Col>
        </Row>
      </div>
    );
  }

  renderstaffDetails() {
    return (
      <div>
        <Row>
          <Col xs={6} md={4}>
            <FormGroup>
              <ControlLabel>Year of Emoployment</ControlLabel>
              <FormControl
                name="yearofemployment"
                value={this.state.staff.yearofEmployment}
                onChange={event => this.handleChange(event)}
                placeholder="Enter Year of Employment"
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col xs={6} md={4}>
            <FormGroup>
              <ControlLabel>Next of Kin</ControlLabel>
              <FormControl
                name="nextofkin"
                value={this.state.staff.nextofKin}
                onChange={event => this.handleChange(event)}
                placeholder="Enter Next of kin "
              />
            </FormGroup>
          </Col>

          <Col xs={6} md={4}>
            <FormGroup>
              <ControlLabel>Next of Kin Phone Number</ControlLabel>
              <FormControl
                name="nextofkinphonenumber"
                value={this.state.staff.nextofKinPhoneNumber}
                onChange={event => this.handleChange(event)}
                placeholder="Enter Next of kin Phone number"
              />
            </FormGroup>
          </Col>
        </Row>

        <Row>
          <Col xs={6} md={10}>
            <FormGroup>
              <ControlLabel>Next of kin Address</ControlLabel>
              <FormControl
                componentClass="textarea"
                name="nextofkinaddress"
                value={this.state.staff.nextofKinAddress}
                onChange={event => this.handleChange(event)}
                placeholder="Enter Next of kin Address"
              />
            </FormGroup>
          </Col>
        </Row>
      </div>
    );
  }

  render() {
    return (
      <div className="formcontainer">
        <form className="registrationform">
          <Grid>
            <Row>
              <Col>
                <ControlLabel className="register">
                  Registeration Form
                </ControlLabel>
              </Col>
            </Row>
            <Row>
              <Col xs={6} md={4}>
                <FormGroup>
                  <ControlLabel>First Name</ControlLabel>
                  <FormControl
                    name="firstname"
                    value={this.state.credentials.firstName}
                    onChange={event => this.handleChange(event)}
                    placeholder="Enter First Name"
                  />
                </FormGroup>
              </Col>

              <Col xs={6} md={4}>
                <FormGroup>
                  <ControlLabel>Last Name</ControlLabel>
                  <FormControl
                    name="lastname"
                    value={this.state.credentials.lastName}
                    onChange={event => this.handleChange(event)}
                    placeholder="Enter Last Name"
                  />
                </FormGroup>
              </Col>
            </Row>

            <Row>
              <Col xs={6} md={4}>
                <FormGroup>
                  <ControlLabel>Email Address</ControlLabel>
                  <FormControl
                    name="emailaddress"
                    value={this.state.credentials.emailAddress}
                    onChange={event => this.handleChange(event)}
                    placeholder="Enter Email Address"
                  />
                </FormGroup>
              </Col>
              <Col xs={6} md={4}>
                <FormGroup>
                  <ControlLabel>Phone Number</ControlLabel>
                  <FormControl
                    name="phonenumber"
                    value={this.state.credentials.phoneNumber}
                    onChange={event => this.handleChange(event)}
                    placeholder="Enter Phone Number"
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col xs={6} md={10}>
                <FormGroup>
                  <ControlLabel>Address</ControlLabel>
                  <FormControl
                    componentClass="textarea"
                    name="address"
                    value={this.state.credentials.address}
                    onChange={event => this.handleChange(event)}
                    placeholder="Enter Address"
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col xs={6} md={4}>
                <FormGroup>
                  <ControlLabel>Gender</ControlLabel>
                  <FormControl
                    componentClass="select"
                    name="gender"
                    value={this.state.credentials.address}
                    onChange={event => this.handleChange(event)}
                    placeholder="Select Gender"
                  >
                    <option value="null">select an option</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </FormControl>
                </FormGroup>
              </Col>
              <Col xs={6} md={4}>
                <FormGroup>
                  <ControlLabel>Date of Birth</ControlLabel>
                  <FormControl
                    name="dateofbirth"
                    value={this.state.credentials.dateOfBirth}
                    onChange={event => this.handleChange(event)}
                    placeholder="Select Date of Birth"
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col xs={12} md={8}>
                <FormGroup>
                  <ControlLabel>Account Type</ControlLabel>
                  <FormControl
                    componentClass="select"
                    name="accounttype"
                    value={this.state.credentials.AccountType}
                    onChange={event => this.handleChange(event)}
                    placeholder="Select Account Type"
                  >
                    <option value="null">select an option</option>
                    <option value="student">Student</option>
                    <option value="staff">Staff</option>
                  </FormControl>
                </FormGroup>
              </Col>
            </Row>
            {this.state.AccountType === "student"
              ? this.renderstudentDetails()
              : this.renderstaffDetails()}
            <br />

            <Row>
              <Col xs={6} md={4}>
                <FormGroup>
                  <ControlLabel>Password</ControlLabel>
                  <FormControl
                    name="password"
                    type="password"
                    value={this.state.password}
                    onChange={event => this.handleChange(event)}
                    placeholder="Password"
                  />
                </FormGroup>
              </Col>

              <Col xs={6} md={4}>
                <FormGroup>
                  <ControlLabel>Repeat password</ControlLabel>
                  <FormControl
                    name="repeatPassword"
                    type="password"
                    value={this.state.passwordRepeat}
                    onChange={event => this.handleChange(event)}
                    placeholder="Repeat password"
                  />
                </FormGroup>
              </Col>
            </Row>

            <div className="buttoncontainer">
              <Button
                bsStyle="success"
                onClick={() => this.handleRegistration()}
                className="button"
              >
                Register
              </Button>
            </div>
          </Grid>
        </form>
      </div>
    );
  }
}

export default Registration;
