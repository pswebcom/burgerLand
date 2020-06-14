import React, { Component } from "react";
import Button from "../../../components/UI/Button/Button";
import Spinner from "../../../components/UI/Spinner/Spinner";
import axios from "../../../firebase/axios-orders";
import { Redirect } from "react-router-dom";
// import Input from "../../../components/UI/Input/Input";
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
    // customer: {
    name: "",
    email: "",
    street: "",
    postalCode: "",
    country: "",
    delivery: "",
    // },

    loading: false,
    errors: [],
    redirectToOrders: false,
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
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

  handleOrderSubmit = (e) => {
    e.preventDefault();
    const {
      name,
      email,
      street,
      postalCode,
      country,
      delivery,
      ingredients,
      sauces,
      breadSelected,
      totalPrice,
    } = this.state;
    this.setState({ errors: [], loading: true });

    if (this.isFormValid()) {
      let day = new Date().getDate();
      let month = new Date().getMonth();
      let correctMonth = month < 10 ? "0" + month : month;
      let year = new Date().getFullYear();
      let invoiceDate = day + "/" + correctMonth + "/" + year;
      const order = {
        ingredients: ingredients,
        sauces: sauces,
        bread: breadSelected,
        price: totalPrice,
        customer: {
          name: name,
          email: email,
          address: {
            street: street,
            zipcode: postalCode,
            country: country,
          },
        },
        deliveryMethod: delivery,
        invoiceDate: invoiceDate,
      };
      //  setTimeout(() => {
      axios
        .post("/orders.json", order)
        .then((resp) =>
          this.setState({ loading: false, redirectToOrders: true })
        )
        .catch((err) => this.setState({ loading: false }));
    }
  };

  isFormValid = () => {
    let error;
    let errors = [];

    if (this.isInputEmpty(this.state)) {
      error = { message: "Please fill in all the fields" };
      this.setState({ errors: errors.concat(error), loading: false });
      return false;
    } else if (!this.isInputValid(this.state)) {
      return false;
    }
    return true;
  };

  handleInputError = (errors, inputName) => {
    return errors.some((err) => err.message.toLowerCase().includes(inputName))
      ? "error"
      : "";
  };

  isInputEmpty = ({ name, email, street, postalCode, country, delivery }) => {
    return (
      !name.length ||
      !email.length ||
      !street.length ||
      !postalCode.length ||
      !country.length ||
      !delivery.length
    );
  };

  displayErrors = (errors) =>
    errors.map((err, i) => <p key={i}>{err.message}</p>);

  isInputValid = ({ email, postalCode }) => {
    let error;
    let errors = [];

    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      error = { message: "A valid email is required" };
      this.setState({
        errors: errors.concat(error),
        loading: false,
      });
      return false;
    }
    if (!/^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/.test(postalCode)) {
      error = { message: "A valid canadian postal code is required" };
      this.setState({
        errors: errors.concat(error),
        loading: false,
      });
      return false;
    }
    return true;
  };

  render() {
    const { errors, redirectToOrders } = this.state;
    let form = (
      <form className="ui form">
        <div className="field">
          <input
            type="text"
            name="name"
            placeholder="Name"
            onChange={this.handleChange}
            className={this.handleInputError(errors, "name")}
          />
        </div>
        <div className="field">
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={this.handleChange}
            className={this.handleInputError(errors, "email")}
          />
        </div>
        <div className="field">
          <input
            type="text"
            name="street"
            placeholder="Street Address"
            onChange={this.handleChange}
            className={this.handleInputError(errors, "street")}
          />
        </div>
        <div className="field">
          <input
            type="text"
            name="postalCode"
            placeholder="Postal code"
            onChange={this.handleChange}
            className={this.handleInputError(errors, "postal")}
          />
        </div>
        <div className="field">
          <select
            className="ui fluid search dropdown"
            onChange={this.handleChange}
            name="country"
            className={this.handleInputError(errors, "country")}
          >
            <option value="">Country</option>
            <option value="usa">USA</option>
            <option value="canada">Canada</option>
            <option value="mexico">Mexico</option>
          </select>
        </div>
        <div className="field">
          <select
            className="ui fluid search dropdown"
            onChange={this.handleChange}
            name="delivery"
            className={this.handleInputError(errors, "delivery")}
          >
            <option value="">Delivery Method</option>
            <option value="fastest">Fastest</option>
            <option value="regular">Regular</option>
          </select>
        </div>
        <Button
          className="btnone"
          color="green"
          size="larger"
          btnClicked={this.handleOrderSubmit}
        >
          Order Now
        </Button>
      </form>
    );

    if (this.state.loading) {
      form = <Spinner />;
    }

    if (redirectToOrders) {
      //RETURN TO PROFILE COMPONENT
      return <Redirect to={`/orders`} />;
    }

    return (
      <div className="contact-data">
        <h1>Enter your Contact Data</h1>
        {/* <div
          className="alert alert-danger mb-2"
          style={{
            display: error ? "" : "none",
          }}
        >
          {error}
        </div> */}

        {errors.length > 0 && (
          <div className="errors">{this.displayErrors(this.state.errors)}</div>
        )}

        {form}
      </div>
    );
  }
}

export default ContactData;
