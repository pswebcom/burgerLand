import React from "react";
import "./BreadControl.css";

const breadControl = (props) => {
  return (
    <React.Fragment>
      <label className="container-bread">
        {props.label}
        <input type="radio" name="radio" onChange={props.breadSelected} />
        <span className="checkmark-bread"></span>
      </label>
    </React.Fragment>
  );
};

export default breadControl;
