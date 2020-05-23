import React, { Component } from "react";
import "./Modal.css";
import Backdrop from "../Backdrop/Backdrop";
import Button from "../Button/Button";

class Modal extends Component {
  // so this component will only change if show is changed it doesnt matter if the ingredients change now
  shouldComponentUpdate(nextProps, nextState) {
    if (
      nextProps.show !== this.props.show ||
      //<component>{props.children}<component> so any change in childrens also coz of spinner we r adding
      nextProps.children !== this.props.children
    ) {
      return true;
    }
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   return nextProps.show !== this.props.show;
  // }

  render() {
    return (
      <React.Fragment>
        <Backdrop
          show={this.props.show}
          hideBackdrop={this.props.hideBackdrop}
        />
        <div
          className="ui active modal"
          style={{
            display: this.props.show ? "" : "none",
          }}
        >
          <div className="modal-info">
            <h1>Your Order</h1>
            <p> This Delicious Burger has following Ingredients </p>
          </div>
          <div className="children">{this.props.children}</div>
          <p className="bill-para">
            Your Total Bill Amount is:{`$${this.props.totalPrice.toFixed(2)}`}
          </p>
          {/* <button className="ui red button btn">CheckOut</button> */}
          <div className="btns">
            <Button
              size="large"
              color="#16AB39"
              btnClicked={this.props.btnClicked}
            >
              Back To Order
            </Button>
            <Button
              text="Confirm Purchase"
              size="large"
              color="#D01919"
              btnClicked={this.props.purchaseContinue}
            >
              Confirm Purchase
            </Button>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Modal;
