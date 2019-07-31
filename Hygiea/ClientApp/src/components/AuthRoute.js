import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import { VerifyLoginStatus } from "../utilities/helper";

class AuthRoute extends Component {
	render() {
		if (!VerifyLoginStatus()) return <Redirect to="/login" />;
		return <Route {...this.props} />;
	}
}

export default AuthRoute;
