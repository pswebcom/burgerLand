import React from "react";
import BuildControl from "./BuildControl/BuildControl";
import "./BuildControls.css";
// import SauceControl from "../SauceControls/SauceControl/SauceControl";

const controls = [
  { label: "Salad", type: "Salad" },
  { label: "Bacon", type: "Bacon" },
  { label: "Cheese", type: "Cheese" },
  { label: "Meat", type: "Meat" },
  { label: "Veg", type: "Veg" },
];

const buildControls = (props) => (
  <div className="Controls">
    <div className="BuildControls" style={{ backgroundColor: "#EAAE00" }}>
      {controls.map((ctrl) => (
        <BuildControl
          key={ctrl.label}
          label={ctrl.label}
          type={ctrl.type}
          addIngredient={() => props.addIngredient(ctrl.type)}
          removeIngredient={() => props.removeIngredient(ctrl.type)}
          disabled={props.disabledInfo[ctrl.type]}
        />
      ))}
    </div>
  </div>
);

export default buildControls;
