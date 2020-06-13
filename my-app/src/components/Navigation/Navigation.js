import React from "react";
import NavigationItems from "../Navigation/NavigationItems/NavigationItems";
import "./Navigation.css";

const navigation = () => {
  return (
    <nav className="navbar navbar-expand-md bg-dark navbar-dark ">
      <div className="container  d-flex">
        <a className="navbar-brand ss" href="#">
          <i className="fas fa-hamburger fa-3x"></i>BurgerLand
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#collapsibleNavbar"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse " id="collapsibleNavbar">
          <ul className="navbar-nav ml-auto align-items-center ss ">
            <NavigationItems />
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default navigation;
