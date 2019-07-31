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
      Id: "",
      FirstName: "",
      LastName: "",
      EmailAddress: "",
      Gender: "",
      Phonenumber: "",
      DateOfBirth: "",
      Address: "",
      PasswordHash: ""
    },
    student: {
      Faculty: "",
      Department: "",
      MatricNumber: "",
      ParentPhoneNumber: "",
      ParentAddress: "",
      YearofEntry: ""
    },
    staff: {
      YearofEmployment: "",
      NextofKin: "",
      NextofKinAddress: "",
      NextofKinPhoneNumber: ""
    },
    passwordRepeat: "",
    AccountType: "student",
    
  };

  handleRegistration() {
    const obj = {...this.state.credentials, ...this.state.student, ...this.state.staff, AccountType: this.state.AccountType};

    fetch("http://localhost:52161/api/user/register", {
      method: "POST",
      body: JSON.stringify(obj),
      headers: new Headers({
        "Accept": "application/json",
        "Content-Type": "application/json"
      })      
    })
      .then(res => res.json())
      .then(data => {})
      .catch(err => alert("Error ocurred!"));

    console.log(obj);
  }
  getValidationState() {
    const length = this.state.credentials.PasswordHash.length;
    if (length > 5) return 'success';
    else if (length > 2) return 'warning';
    else if (length > 0) return 'error';
    return null;
  }
  validatePassword(){
    if(this.state.credentials.PasswordHash.trim().length<=0) return null;

    if(this.state.passwordRepeat === this.state.credentials.PasswordHash) return 'success';
   
    else if (this.state.passwordRepeat ===! this.state.credentials.PasswordHash) 
      
      return 'error';
    
  }

  handleChange(event) {
    const obj = { ...this.state };

    if (event.target.name === "firstname") {
      obj.credentials.FirstName = event.target.value;
    } else if (event.target.name === "lastname") {
      obj.credentials.LastName = event.target.value;
    } else if (event.target.name === "emailaddress") {
      obj.credentials.EmailAddress = event.target.value;
    } else if (event.target.name === "gender") {
      obj.credentials.Gender = event.target.value;
    } else if (event.target.name === "phonenumber") {
      obj.credentials.Phonenumber = event.target.value;
    } else if (event.target.name === "dateofbirth") {
      obj.credentials.DateOfBirth = event.target.value;
    } else if (event.target.name === "address") {
      obj.credentials.Address = event.target.value;
    } else if (event.target.name === "faculty") {
      obj.student.Faculty = event.target.value;
    } else if (event.target.name === "department") {
      obj.student.Department = event.target.value;
    } else if (event.target.name === "matricnumber") {
      obj.student.MatricNumber = event.target.value;
    } else if (event.target.name === "parentphonenumber") {
      obj.student.ParentPhoneNumber = event.target.value;
    } else if (event.target.name === "parentaddress") {
      obj.student.ParentAddress = event.target.value;
    } else if (event.target.name === "yearofentry") {
      obj.student.YearofEntry = event.target.value;
    } else if (event.target.name === "yearofemployment") {
      obj.staff.YearofEmployment = event.target.value;
    } else if (event.target.name === "nextofkin") {
      obj.staff.NextofKin = event.target.value;
    } else if (event.target.name === "nextofkinaddress") {
      obj.staff.NextofKinAddress = event.target.value;
    } else if (event.target.name === "nextofkinphonenumber") {
      obj.staff.NextofKinPhoneNumber = event.target.value;
    } else if (event.target.name === "accounttype") {
      obj.AccountType = event.target.value;
    }else if (event.target.name === "password"){
      obj.credentials.PasswordHash = event.target.value;
    }else if(event.target.name === "passwordRepeat"){
      obj.passwordRepeat = event.target.value;
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
                value={this.state.student.MatricNumber}
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
                value={this.state.student.YearofEntry}
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
                value={this.state.student.Faculty}
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
                value={this.state.student.Department}
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
                value={this.state.student.ParentAddress}
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
                value={this.state.staff.YearofEmployment}
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
                value={this.state.staff.NextofKin}
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
                value={this.state.staff.NextofKinPhoneNumber}
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
                value={this.state.staff.NextofKinAddress}
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
                  Registration Form
                </ControlLabel>
              </Col>
            </Row>
            <Row>
              <Col xs={6} md={4}>
                <FormGroup>
                  <ControlLabel>First Name</ControlLabel>
                  <FormControl
                    name="firstname"
                    value={this.state.credentials.FirstName}
                    onChange={event => this.handleChange(event)}
                    placeholder="Enter First Name"
                    required
                  />
                </FormGroup>
              </Col>

              <Col xs={6} md={4}>
                <FormGroup>
                  <ControlLabel>Last Name</ControlLabel>
                  <FormControl
                    name="lastname"
                    value={this.state.credentials.LastName}
                    onChange={event => this.handleChange(event)}
                    placeholder="Enter Last Name"
                    required
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
                    value={this.state.credentials.EmailAddress}
                    onChange={event => this.handleChange(event)}
                    placeholder="Enter Email Address"
                    required
                  />
                </FormGroup>
              </Col>
              <Col xs={6} md={4}>
                <FormGroup>
                  <ControlLabel>Phone Number</ControlLabel>
                  <FormControl
                    name="phonenumber"
                    value={this.state.credentials.Phonenumber}
                    onChange={event => this.handleChange(event)}
                    placeholder="Enter Phone Number"
                    required
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
                    value={this.state.credentials.Address}
                    onChange={event => this.handleChange(event)}
                    placeholder="Enter Address"
                    required
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
                    value={this.state.credentials.Gender}
                    onChange={event => this.handleChange(event)}
                    placeholder="Select Gender"
                    required
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
                    value={this.state.credentials.DateOfBirth}
                    onChange={event => this.handleChange(event)}
                    placeholder="Select Date of Birth"
                    required
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
                    required
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
                <FormGroup validationState={this.getValidationState()}>
                  <ControlLabel>Password</ControlLabel>
                  <FormControl
                    name="password"
                    type="password"
                    value={this.state.password}
                    onChange={event => this.handleChange(event)}
                    placeholder="Password"
                  /><FormControl.Feedback />
                  {/* <HelpBlock>Validation is based on string length.</HelpBlock> */}
                </FormGroup>
              </Col>

              <Col xs={6} md={4}>
                <FormGroup validationState={this.validatePassword()}>
                  <ControlLabel>Repeat password</ControlLabel>
                  <FormControl
                    name="passwordRepeat"
                    type="password"
                    value={this.state.passwordRepeat}
                    onChange={event => this.handleChange(event)}
                    placeholder="Repeat password"
                  /><FormControl.Feedback />
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
