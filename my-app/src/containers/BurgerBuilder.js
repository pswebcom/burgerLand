import React, { Component } from "react";
import Burger from "../components/Burger/Burger";
import BuildControls from "../components/Burger/BuildControls/BuildControls";
import BreadControls from "../components/Burger/BreadControls/BreadControls";
import SauceControls from "../components/Burger/SauceControls/SauceControls";
import Modal from "../components/UI/Modal/Modal";
import OrderSummary from "../components/Burger/OrderSummary/OrderSummary";
import ErrorModal from "../components/UI/ErrorModal/ErrorModal";
import axios from "../firebase/axios-orders";
import Spinner from "../components/UI/Spinner/Spinner";
import "./BurgerBuilder.css";

const INGREDIENT_PRICES = {
  Salad: 1.5,
  Bacon: 1.4,
  Cheese: 1.8,
  Meat: 1.2,
  Veg: 1.1,
  Mayo: 0.5,
  Ranch: 0.5,
  Hot: 0.6,
  Mustard: 0.6,
  Cheddar: 0.5,
};

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      Salad: 0,
      Bacon: 0,
      Cheese: 0,
      Meat: 0,
      Veg: 0,
    },
    totalPrice: 4,
    sauces: {
      Mayo: false,
      Ranch: false,
      Cheddar: false,
      Mustard: false,
      Hot: false,
    },
    breadSelected: "",
    purchasable: false,
    purchasing: false,
    message: "",
    sauceSelected: false,
    Error: false,
    loading: false,
  };

  //clicked to fix the error
  errorCancelHandler = () => {
    this.setState({ Error: false });
  };
  //clicked to change the order
  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };
  purchaseContinueHandler = () => {
    this.setState({ loading: true });

    const order = {
      ingredients: this.state.ingredients,
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

    setTimeout(() => {
      axios
        .post("/orders.json", order)
        .then((resp) => this.setState({ loading: false, purchasing: false }))
        .catch((err) => this.setState({ loading: false, purchasing: false }));
    }, 500);
  };
  purchaseClickHandler = () => {
    if (this.state.breadSelected === "") {
      this.setState({
        Error: true,
        message: "Please Select a Bread to Continue",
      });
    } else if (this.state.sauceSelected === false) {
      this.setState({
        Error: true,
        message: "Please choose atleast one Sauce to Continue",
      });
    } else {
      this.setState({ purchasing: true });
    }
  };
  componentDidUpdate(prevProps, prevState) {
    if (this.state.ingredients !== prevState.ingredients) {
      const ingredients = {
        ...this.state.ingredients,
      };

      const sum = Object.keys(ingredients)
        .map((ingKey) => {
          return ingredients[ingKey];
        })
        .reduce((sum, el) => {
          return sum + el;
        });

      this.setState({
        purchasable: sum > 0,
      });
    }
  }
  addIngredienthandler = (type) => {
    let oldCount = this.state.ingredients[type];
    let updatedCount = oldCount + 1;
    let updatedIngredients = {
      ...this.state.ingredients,
    };
    updatedIngredients[type] = updatedCount;

    // price
    const price = INGREDIENT_PRICES[type];
    let oldPrice = this.state.totalPrice;
    let newPrice = price + oldPrice;
    this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
  };
  removeIngredienthandler = (type) => {
    let oldCount = this.state.ingredients[type];
    if (oldCount === 0) {
      return;
    }
    let updatedCount = oldCount - 1;
    let updatedIngredient = {
      ...this.state.ingredients,
    };
    updatedIngredient[type] = updatedCount;

    // price
    const price = INGREDIENT_PRICES[type];

    let oldPrice = this.state.totalPrice;

    let newPrice = oldPrice - price;

    this.setState({ totalPrice: newPrice, ingredients: updatedIngredient });
  };
  sauceSelectionHandler = (type) => {
    let isSelected = this.state.sauces[type];
    let updatedSauces = {
      ...this.state.sauces,
    };
    let updatedIsSelected = !isSelected;
    updatedSauces[type] = updatedIsSelected;

    let oldPrice = this.state.totalPrice;
    const price = INGREDIENT_PRICES[type];
    let newPrice;

    if (updatedIsSelected) {
      newPrice = price + oldPrice;
    } else {
      newPrice = oldPrice - price;
    }

    let disabledInformation = Object.keys(updatedSauces).filter((sauceKey) => {
      // return disabledInfoSauces[sauceKey] === false;
      return updatedSauces[sauceKey] === true;
    });

    let val;
    disabledInformation.length > 0 ? (val = true) : (val = false);

    this.setState({
      totalPrice: newPrice,
      sauces: updatedSauces,
      sauceSelected: val,
    });
  };
  breadSelectionHandler = (type) => {
    this.setState({ breadSelected: type });
  };

  render() {
    const disabledInfo = {
      ...this.state.ingredients,
    };

    for (let key in disabledInfo) {
      // so this below look like...salad:true,meat:false
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let orderSummary = (
      <OrderSummary
        ingredients={this.state.ingredients}
        sauces={this.state.sauces}
        breadSelected={this.state.breadSelected}
      />
    );

    if (this.state.loading) {
      console.log("loading", this.state.loading);
      orderSummary = <Spinner />;
    }

    return (
      <React.Fragment>
        <Modal
          show={this.state.purchasing}
          hideBackdrop={this.purchaseCancelHandler}
          totalPrice={this.state.totalPrice}
          btnClicked={this.purchaseCancelHandler}
          purchaseContinue={this.purchaseContinueHandler}
        >
          {orderSummary}
        </Modal>
        <ErrorModal
          showError={this.state.Error}
          hideBackdrop={this.errorCancelHandler}
          message={this.state.message}
          btnClicked={this.errorCancelHandler}
        ></ErrorModal>

        <Burger ingredients={this.state.ingredients} />
        <div className="Controls row">
          <div className="column col-sm-12 col-md-6   col-xl-3">
            <BreadControls breadSelected={this.breadSelectionHandler} />
          </div>
          <div className="column col-sm-12 col-md-6   col-xl-3">
            <BuildControls
              addIngredient={this.addIngredienthandler}
              removeIngredient={this.removeIngredienthandler}
              disabledInfo={disabledInfo}
            />
          </div>
          <div className="column col-sm-12 col-md-6  col-xl-3">
            <SauceControls addSauce={this.sauceSelectionHandler} />
          </div>
          <div className="column col-sm-12 col-md-6  col-xl-3 ">
            <div className="order-info">
              <div className="ui big label">{`Total:   $${this.state.totalPrice.toFixed(
                2
              )}`}</div>
              <button
                disabled={!this.state.purchasable}
                className="massive green ui button"
                onClick={this.purchaseClickHandler}
              >
                Purchase Now
              </button>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default BurgerBuilder;
