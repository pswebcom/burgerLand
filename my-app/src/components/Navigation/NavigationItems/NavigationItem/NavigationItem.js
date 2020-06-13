import React from "react";
import { NavLink } from "react-router-dom";
import "./NavigationItem.css";

const navigationItem = (props) => (
  <li style={{ marginLeft: "10px" }}>
    <NavLink
      style={{ backgroundColor: "#16AB39" }}
      to={props.link}
      exact={props.exact}
      className="nav-link"
      activeStyle={{ backgroundColor: "green" }}
    >
      {props.children}
    </NavLink>
  </li>
);

export default navigationItem;
