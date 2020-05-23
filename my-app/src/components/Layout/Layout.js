import React from "react";
import Navigation from "../../components/Navigation/Navigation";
import "./Layout.css";


const layout = (props) => (
  <React.Fragment>
    <div className="layout">
      <Navigation />
    </div>
    <main>{props.children}</main>
  </React.Fragment>
);

export default layout;
