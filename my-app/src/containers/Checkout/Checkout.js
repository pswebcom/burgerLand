import React, { Component } from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";
import { Route } from "react-router-dom";
import "./Checkout.css";

class Checkout extends Component {
  state = {
    ingredients: {
      Salad: 0,
      Bacon: 0,
      Cheese: 0,
      Meat: 0,
      Veg: 0,
    },
    totalPrice: 0,
    sauces: {
      Mayo: false,
      Ranch: false,
      Cheddar: false,
      Mustard: false,
      Hot: false,
    },
    breadSelected: "",
  };

  componentDidMount() {
    const query = new URLSearchParams(this.props.location.search);
    let ingredients = {};
    let sauces = {};
    let breadSelected = "";
    let totalPrice = 0;

    for (let iterator of query.entries()) {
      if (iterator[0] === "price") {
        totalPrice = Number(iterator[1]);
      } else if (iterator[0] === "bread") {
        breadSelected = iterator[1];
      } else if (iterator[1] === "true" || iterator[1] === "false") {
        sauces[iterator[0]] = JSON.parse(iterator[1]);
      } else if (!isNaN(Number(iterator[1]))) {
        ingredients[iterator[0]] = Number(iterator[1]);
      }
    }

    this.setState({
      ingredients: ingredients,
      sauces: sauces,
      breadSelected: breadSelected,
      totalPrice: totalPrice,
    });
  }

  checkoutCancelledHandler = () => {
    this.props.history.goBack();
  };

  checkoutContinuedHandler = () => {
    const queryIngredients = [];
    const querySauces = [];

    for (let i in this.state.ingredients) {
      queryIngredients.push(
        encodeURIComponent(i) +
          "=" +
          encodeURIComponent(this.state.ingredients[i])
      );
    }
    for (let i in this.state.sauces) {
      querySauces.push(
        encodeURIComponent(i) + "=" + encodeURIComponent(this.state.sauces[i])
      );
    }

    const queryParams = queryIngredients.concat(querySauces);
    queryParams.push(
      "price=" + this.state.totalPrice,
      "bread=" + this.state.breadSelected
    );

    let queryString = queryParams.join("&");

    this.props.history.push({
      pathname: "/contact-data",
      search: "?" + queryString,
    });
  };

  render() {
    // console.log(this.props.match.path);

    return (
      <div className="Checkout">
        <CheckoutSummary
          ingredients={this.state.ingredients}
          sauces={this.state.sauces}
          breadSelected={this.state.breadSelected}
          price={this.state.totalPrice}
          checkoutCancelled={this.checkoutCancelledHandler}
          checkoutContinued={this.checkoutContinuedHandler}
        />
        {/* <Route
          exact
          path={"/contact-data"}
          component={ContactData}
          // render={(props) => (
          //   <ContactData
          //     ingredients={this.state.ingredients}
          //     price={this.state.totalPrice}
          //     {...props}
          //   />
          // )}
        /> */}
      </div>
    );
  }
}

export default Checkout;
