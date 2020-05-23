import React from "react";
import BreadControl from "./BreadControl/BreadControl";
import "./BreadControls.css";

const breadCtrl = [
  { label: "Brown Bread", type: "Brown Bread" },
  { label: "White Bread ", type: "White Bread " },
  { label: "Honey Oat", type: "Honey Oat" },
  { label: "Cheese Bread", type: "Cheese Bread" },
  { label: "Garlic Bread", type: "Garlic Bread" },
];

const BreadControls = (props) => {
  return (
    <div className="BreadControls">
      <h2>Breads</h2>

      {breadCtrl.map((ctrl) => (
        <BreadControl
          key={ctrl.label}
          label={ctrl.label}
          type={ctrl.type}
          breadSelected={() => props.breadSelected(ctrl.type)}
        />
      ))}
    </div>
  );
};

export default BreadControls;
