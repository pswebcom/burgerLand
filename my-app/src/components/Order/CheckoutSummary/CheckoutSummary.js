import React from "react";
import Burger from "../../Burger/Burger";
import Button from "../../UI/Button/Button";
import "./CheckoutSummary.css";
import OrderSummary from "../../Burger/OrderSummary/OrderSummary";

const CheckoutSummary = (props) => {
  console.log(props);
  return (
    <div className="CheckoutSummary">
      <h1 className="heading">Enjoy your burger</h1>
      <h3 style={{ marginTop: "35px" }}>
        Total Price:${props.price.toFixed(2)}
      </h3>
      <div style={{ width: "100%", height: "300px", margin: "auto" }}>
        <Burger
          ingredients={props.ingredients}
          style={{ marginTop: "50px" }}
          className="burger-checkout"
        />
        <OrderSummary
          ingredients={props.ingredients}
          sauces={props.sauces}
          breadSelected={props.breadSelected}
        />
      </div>
      <div className="btns">
        <Button
          className="cancel"
          color="red"
          size="medium"
          btnClicked={props.checkoutCancelled}
        >
          Cancel
        </Button>
        <Button
          className="Add"
          color="green"
          size="medium"
          btnClicked={props.checkoutContinued}
        >
          Checkout Now
        </Button>
      </div>
    </div>
  );
};

export default CheckoutSummary;
