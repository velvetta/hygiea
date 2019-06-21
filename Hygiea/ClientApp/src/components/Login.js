import React from 'react';
import '../styles/login.css';

class Login extends React.Component{
    render(){
        return(
            <button onClick= {() => { this.props.history.push("/")}}>Back</button>
        )   
    }
}

export default Login