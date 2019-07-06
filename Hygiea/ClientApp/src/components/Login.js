import React from 'react';
import '../styles/login.css';
import { Button } from "react-bootstrap";
import {
    Form,
    Col,
    ControlLabel,
    FormControl,
    FormGroup,
   Jumbotron
  } from "react-bootstrap";
import {saveToken} from './Utilities';

class Login extends React.Component{

  state = {
        credentials: {
            EmailAddress: "",
            PasswordHash:""
        }
    };

   
    handleLogin() {
      const obj = {...this.state.credentials}

      fetch("http://localhost:52161/api/user/login", {
        method: "POST",
        body: JSON.stringify(obj),
        headers: new Headers({
          "Accept" : "application/json",
          "Content-Type" : "application/json"
              })
            })
              .then(res => res.json())
              .then(data => {
                saveToken(data.token)
              })
              .catch(err => alert("Error ocurred!"));
        
            console.log(this.state);
        }
    handleChange(event){
      const obj = {...this.state};
      if (event.target.name === "PasswordHash") {
        obj.credentials.PasswordHash = event.target.value;
    }else if(event.target.name === "EmailAddress"){
        obj.credentials.EmailAddress = event.target.value;
    }
    this.setState(obj);
  }

    render(){
        return(
            <div className="divconatiner">
                <div className="card">
                   
                <div className="container"> 
                
                <Form horizontal className="loginform">
               
                <p className="sign">Login</p>
            <FormGroup controlId="formHorizontalEmail">
              <Col componentClass={ControlLabel} sm={2}>
                Email
              </Col>
              <Col sm={10}>
                <FormControl 
                name="EmailAddress"
                type="email" 
                
                value={this.state.credentials.EmailAddress}
                onChange={event => this.handleChange(event)}
                placeholder="Email" 
                />
              </Col>
            </FormGroup>
          
            <FormGroup controlId="formHorizontalPassword">
              <Col componentClass={ControlLabel} sm={2}>
                Password
              </Col>
              <Col sm={10}>
                <FormControl
                 type="password"
                 name="PasswordHash"
                 value={this.state.credentials.PasswordHash}
                 onChange={event => this.handleChange(event)}
                 placeholder="Password" 
                 />
              </Col>
            </FormGroup>
          
            
          
            <FormGroup>
              <Col smOffset={2} sm={10}>
              <div className="buttoncontainer">
              <Button
                bsStyle="success"
                onClick={() => this.handleLogin()}
                className="button"
              >
                Register
              </Button>
            </div>
              </Col>
            </FormGroup>
          </Form>
                </div>
            
            </div>
            </div>
            
            
        )   
    }
}

export default Login