import React from "react";
import NavigationItem from "./NavigationItem/NavigationItem";
import "./NavigationItems.css";

const navigationItems = () => (
  <ul className="navigationItems">
    <NavigationItem link="/" exact className="navigationItem">
      Burger Builder
    </NavigationItem>
    <NavigationItem
      style={{ backgroundColor: "black" }}
      link="/orders"
      className="navigationItem"
    >
      Orders
    </NavigationItem>
  </ul>
);

export default navigationItems;
