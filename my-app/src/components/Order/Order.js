import React from "react";
import "./Order.css";

const Order = (props) => {
  console.log(props);

  // /transform ingredients into an array of ingredients
  const ingredients = [];
  for (let ingredientName in props.ingredients) {
    if (props.ingredients[ingredientName] !== 0) {
      ingredients.push({
        name: ingredientName,
        amount: props.ingredients[ingredientName],
      });
    }
  }

  const sauces = [];
  for (let sauceName in props.sauces) {
    if (props.sauces[sauceName] !== false) {
      sauces.push({
        name: sauceName,
        amount: props.sauces[sauceName],
      });
    }
  }

  const bread = props.bread;
  const price = Number(props.price);
  const orderId = props.orderId;

  const ingredientOutput = ingredients.map((ing) => {
    return (
      <span key={ing.name} className="label">
        {ing.name}
        <span className="num"> {ing.amount}</span>
      </span>
    );
  });

  const sauceOutput = sauces.map((sauce) => {
    return (
      <span key={sauce.name} className="label">
        {sauce.name}
      </span>
    );
  });

  return (
    <div className="ui brown  segment order">
      <table class="ui celled table">
        <thead>
          <tr>
            <th></th>
            <th>
              <h2>Order Id:{orderId}</h2>
            </th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <strong>Ingredients</strong>
            </td>
            <td>
              <p>{ingredientOutput}</p>
            </td>
          </tr>
          <tr>
            <td>
              <strong>Sauces</strong>
            </td>
            <td>
              <p>{sauceOutput}</p>
            </td>
          </tr>
          <tr>
            <td>
              <strong>Bread</strong>
            </td>
            <td>
              <p className="bread">{bread}</p>
            </td>
          </tr>
          <tr>
            <td>
              <strong>Total</strong>
            </td>
            <td>
              <p className="num-price">${price.toFixed(2)}</p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Order;
