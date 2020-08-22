import React, { Fragment } from "react";
import { Route, Switch } from "react-router";
import Header from "./components/Header/Header";
import Dashboard from "./components/Dashboard/Dashboard";
import Drugs from "./components/Drugs/Drugs";
import Appoitments from "./components/Appointment/Appointments";

const routes = [
  { name: "Dashboard", path: "/app/dashboard", component: Dashboard },
  { name: "Drugs", path: "/app/drugs", component: Drugs },
  { name: "Appoitnments", path: "/app/appoitnments", component: Appoitments }

];

function App(props) {
  return (
    <Fragment>
      <Header
        routes={routes.map(x => {
          return { ...x, active: props.history.location.pathname === x.path };
        })}
      />

      <div style={{ paddingTop: 80 }} className="container">
        <Switch>
          {routes.map((route, key) => {
            return (
              <Route key={key} path={route.path} component={route.component}>
                {route.name}
              </Route>
            );
          })}
        </Switch>
      </div>
    </Fragment>
  );
}

export default App;
