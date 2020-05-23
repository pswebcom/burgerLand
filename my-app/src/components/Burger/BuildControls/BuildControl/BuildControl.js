import React from "react";
import "./BuildControl.css";

const buildControl = (props) => {
  //   const { label, added } = props;
  return (
    <div className="BuildControl">
      <div
        className="ui label basic big"
        style={{ backgroundColor: "#D49E00", color: "#fff" }}
      >
        {props.label}
      </div>
      <button
        className="ui button"
        style={{ backgroundColor: "#16ab39", color: "#fff" }}
        onClick={props.removeIngredient}
        disabled={props.disabled}
      >
        {/* <i aria-hidden="true" className="minus icon"></i> */}
        LESS
      </button>

      <button
        className="ui button"
        style={{ backgroundColor: "#16ab39", color: "#fff" }}
        onClick={props.addIngredient}
      >
        MORE
        {/* <i aria-hidden="true" className="plus icon"></i> */}
      </button>
    </div>
  );
};

export default buildControl;
