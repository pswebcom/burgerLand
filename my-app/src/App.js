import React, { Component } from "react";
import Layout from "./components/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder";
import Checkout from "./containers/Checkout/Checkout";
import ContactData from "./containers/Checkout/ContactData/ContactData";
import { Route, Switch } from "react-router-dom";
import Orders from "./containers/Orders/Orders";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="app">
        <Layout>
          <Switch>
            <Route exact path="/" component={BurgerBuilder} />
            <Route exact path="/checkout" component={Checkout} />
            <Route exact path="/contact-data" component={ContactData} />
            <Route exact path="/orders" component={Orders} />
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default App;
