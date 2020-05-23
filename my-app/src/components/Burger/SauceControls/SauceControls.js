import React from "react";
import SauceControl from "./SauceControl/SauceControl";
import "./SauceControls.css";

const sauceCtrl = [
  { label: "Mayonese", type: "Mayo" },
  { label: "Ranch ", type: "Ranch" },
  { label: "Cheddar Cheese", type: "Cheddar" },
  { label: "Honey Mustard", type: "Mustard" },
  { label: "Hot Sauce", type: "Hot" },
];
const sauceControls = (props) => (
  <div className="SauceControls">
    <h2>Sauces</h2>
    {sauceCtrl.map((ctrl) => (
      <SauceControl
        key={ctrl.label}
        label={ctrl.label}
        type={ctrl.type}
        addSauce={() => props.addSauce(ctrl.type)}
      />
    ))}
  </div>
);

export default sauceControls;
