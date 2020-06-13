import React, { Component } from "react";
import Button from "../../../components/UI/Button/Button";
import Spinner from "../../../components/UI/Spinner/Spinner";
import axios from "../../../firebase/axios-orders";
import "./ContactData.css";

class ContactData extends Component {
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
    name: "",
    email: "",
    address: {
      street: "",
      postalcode: "",
    },
    loading: false,
  };

  componentDidMount() {
    const query = new URLSearchParams(this.props.location.search);
    let ingredients = {};
    let sauces = {};
    let breadSelected = "";
    let totalPrice = 0;

    for (let iterator of query.entries()) {
      if (iterator[0] === "price") {
        totalPrice = iterator[1];
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

  orderHandler = (e) => {
    e.preventDefault();
    this.setState({ loading: true });
    const order = {
      ingredients: this.state.ingredients,
      sauces: this.state.sauces,
      bread: this.state.breadSelected,
      price: this.state.totalPrice,
      customer: {
        name: "Maxmillan",
        address: {
          street: "Teststreet",
          zipcode: "12345",
          country: "Germany",
        },
        email: "test@test.com",
      },
      deleiveryMethod: "fastest",
    };

    //  setTimeout(() => {
    axios
      .post("/orders.json", order)
      .then((resp) => this.setState({ loading: false }))
      .catch((err) => this.setState({ loading: false }));
    //  }, 500);
  };

  render() {
    let form = (
      <form className="ui form">
        <div className="field">
          <label>First Name</label>
          <input type="text" name="first-name" placeholder="First Name" />
        </div>
        <div className="field">
          <label>Last Name</label>
          <input type="text" name="last-name" placeholder="Last Name" />
        </div>
        <div className="field">
          <div className="ui checkbox">
            <input type="checkbox" className="hidden" />
            <label>I agree to the Terms and Conditions</label>
          </div>
        </div>
        <Button
          className="Add"
          color="green"
          size="medium"
          btnClicked={this.orderHandler}
        >
          Order Now
        </Button>
      </form>
    );

    if (this.state.loading) {
      form = <Spinner />;
    }

    return (
      <div className="contact-data">
        <h1>Enter your Contact Data</h1>
        {form}
      </div>
    );
  }
}

export default ContactData;
