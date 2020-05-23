import React from "react";
import "./Button.css";

const Button = (props) => {
  return (
    <button
      style={{ backgroundColor: props.color }}
      //**************below to add dynamically*************
      className={`ui button btn  ${props.size}`}
      onClick={props.btnClicked}
    >
      {props.children}
    </button>
  );
};

export default Button;
