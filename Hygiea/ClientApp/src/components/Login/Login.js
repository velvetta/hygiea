import React from "react";
import styles from "./Login.module.css";
import { saveToken } from "../../utils";

class Login extends React.Component {
  constructor(props) {
    console.log("Started")
    super(props);
    this.state = {
      credentials: {
        EmailAddress: "",
        PasswordHash: ""
      }
    };
  }

  // handleLogin() {
  //   const obj = { ...this.state.credentials };

  //   fetch("http://localhost:52161/api/user/login", {
  //     method: "POST",
  //     body: JSON.stringify(obj),
  //     headers: new Headers({
  //       "Content-Type": "application/json"
  //     })
  //   })
  //     .then(res => {
  //       //console.log(await res.text());
  //       console.log("in here!!");
  //       return res.json();
  //     })
  //     .then(data => {
  //       console.log("in here!!");
  //       saveToken(data.token);
  //     })
  //     .catch(err => alert("Unable to process login request! " + err.message));

  //   console.log(this.state);
  // }

  handleLogin() {
    const obj = {...this.state.credentials}
console.log(obj)
    fetch("http://localhost:52161/api/user/login", {
      method: "POST",
      body: JSON.stringify(obj),
      headers: new Headers({
        "Accept" : "application/json",
        "Content-Type" : "application/json"
            })
          })
            .then(res =>{
              console.log("In here")
              return  res.json();
            })
            .then(data => {
              console.log("In here!")
              if(data.token){
                saveToken(data.token)
                this.props.history.push("/app/dashboard");
              }
              
            })
            .catch(err => alert("Error ocurred!"));
      
          console.log(this.state);
      }

  handleChange(event) {
    const obj = { ...this.state };
    if (event.target.name === "PasswordHash") {
      obj.credentials.PasswordHash = event.target.value;
    } else if (event.target.name === "EmailAddress") {
      obj.credentials.EmailAddress = event.target.value;
    }
    console.log(this.state)
    this.setState(obj);
  }

  render() {
    return (
      <div className={styles.root}>
        <div>
          <div className={styles.header}>
            <h1>Hygiea</h1>
          </div>
          <div className={styles["form-group"]}>
            <label>Username</label>
            <input name="EmailAddress" onChange={(e) => this.handleChange(e)} type="text" />
          </div>

          <div className={styles["form-group"]}>
            <label>Password</label>
            <input name="PasswordHash" onChange={(e) => this.handleChange(e)} type="password" />
          </div>

          <button className={styles.submit} onClick={() => this.handleLogin()}>LOGIN</button>

          <p className={styles["register-notice"]}>Not registered? Click <a href="#pablo">here</a> to get started!</p>
        </div>
      </div>
    );
  }
}

export default Login;
