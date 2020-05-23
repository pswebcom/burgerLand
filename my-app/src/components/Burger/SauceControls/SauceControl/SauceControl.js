import React from "react";
import "./SauceControl.css";

const sauceControl = (props) => {
  return (
    <React.Fragment>
      <label className="container">
        {props.label}
        <input type="checkbox" onClick={props.addSauce} />
        <span className="checkmark"></span>
      </label>
    </React.Fragment>
  );
};

export default sauceControl;
