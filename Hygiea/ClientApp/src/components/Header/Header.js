import React, { Component } from "react";
import styles from "./Header.module.css";
import { withRouter } from "react-router-dom";

class Header extends Component {
  render() {
    console.log(this.props.history);
    return (
      <div className={styles.root}>
        <div className={[styles.wrap, "container"].join(" ")}>
          <div>
            {/* <img className="brand-logo" /> */}
            <h1 className={styles["brand-title"]}>Hygiea</h1>
          </div>
          <div className={styles.sep} />
          <nav className={styles["main-nav"]}>
            {this.props.routes
              ? this.props.routes.map((route, key) => {
                  const classNames = [
                    styles["nav-item"],
                    route.active ? styles["nav-item-active"] : ""
                  ].join(" ");
                  return (
                    <li
                      key={key}
                      className={classNames}
                      onClick={() => this.props.history.push(route.path)}
                    >
                      {route.name}
                    </li>
                  );
                })
              : null}
          </nav>
        </div>
      </div>
    );
  }
}

export default withRouter(Header);
