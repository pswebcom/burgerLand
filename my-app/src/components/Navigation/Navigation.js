import React from "react";
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
            <li className="nav-item">
              <a className="nav-link" href="#">
                BurgerBuilder
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                About Us
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Checkout
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default navigation;
