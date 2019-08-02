import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/css/bootstrap-theme.css";
import "./index.css";
import React, {Fragment} from "react";
import ReactDOM from "react-dom";
import Login from "./components/Login/Login";
// import { Provider } from 'react-redux';
// import { ConnectedRouter } from 'react-router-redux';
// import { createBrowserHistory } from 'history';
// import configureStore from './store/configureStore';
import registerServiceWorker from "./registerServiceWorker";
import {BrowserRouter, Route, Redirect, Switch} from "react-router-dom";
import App from "./App";

function renderRoutes() {
  /* Routes go here! */
  return (
    <Switch>
      {/* Temporary */}
      <Route path="/login" component={Login} />
      <Route path="/app" component={App}/>
    </Switch>
  );
}
const rootElement = document.getElementById("root");

ReactDOM.render(
  <BrowserRouter>{renderRoutes()}</BrowserRouter>,
  rootElement
);

registerServiceWorker();
