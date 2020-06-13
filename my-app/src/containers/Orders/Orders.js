import React, { Component } from "react";
import Order from "../../components/Order/Order";
import axios from "../../firebase/axios-orders";
import "./Orders.css";

export default class Orders extends Component {
  state = {
    orders: [],
    loading: true,
  };

  componentDidMount() {
    axios
      .get("/orders.json")
      .then((res) => {
        const fetchedOrders = [];
        for (const key in res.data) {
          fetchedOrders.push({ ...res.data[key], id: key });
        }
        console.log(fetchedOrders);
        this.setState({ loading: false, orders: fetchedOrders });
      })
      .catch((err) => {
        this.setState({ loading: false });
      });
  }

  render() {
    return (
      <div className="orders">
        {this.state.orders.map((order) => {
          return (
            <Order
              key={order.id}
              ingredients={order.ingredients}
              sauces={order.sauces}
              bread={order.bread}
              price={order.price}
              orderId={order.id}
            />
          );
        })}
      </div>
    );
  }
}
