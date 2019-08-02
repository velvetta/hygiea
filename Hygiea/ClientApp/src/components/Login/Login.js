import React from "react";
import styles from "./Login.module.css";
import { saveToken } from "../../utils";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      credentials: {
        EmailAddress: "",
        PasswordHash: ""
      }
    };
  }

  handleLogin() {
    const obj = { ...this.state.credentials };

    fetch("http://localhost:52161/api/user/login", {
      method: "POST",
      body: JSON.stringify(obj),
      headers: new Headers({
        Accept: "application/json",
        "Content-Type": "application/json"
      })
    })
      .then(res => res.json())
      .then(data => {
        saveToken(data.token);
      })
      .catch(err => alert("Unable to process login request! " + err.message));

    console.log(this.state);
  }

  handleChange(event) {
    const obj = { ...this.state };
    if (event.target.name === "PasswordHash") {
      obj.credentials.PasswordHash = event.target.value;
    } else if (event.target.name === "EmailAddress") {
      obj.credentials.EmailAddress = event.target.value;
    }
    this.setState(obj);
  }

  render() {
    return (
      <div className={styles.root}>
        <form onSubmit={() => this.handleLogin()}>
          <div className={styles.header}>
            <h1>Hygiea</h1>
          </div>
          <div className={styles["form-group"]}>
            <label>Username</label>
            <input type="text" />
          </div>

          <div className={styles["form-group"]}>
            <label>Password</label>
            <input type="password" />
          </div>

          <button className={styles.submit}>LOGIN</button>

          <p className={styles["register-notice"]}>Not registered? Click <a href="#pablo">here</a> to get started!</p>  
        </form>
      </div>
    );
  }
}

export default Login;
