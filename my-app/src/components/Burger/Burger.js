import React from "react";
import "./Burger.css";
import BurgerIngredient from "./BurgerIngredients/BurgerIngredients";

const burger = (props) => {
  let transformedIngredients = Object.keys(props.ingredients)
    .map((ingKey) => {
      return [...Array(props.ingredients[ingKey])].map((_, index) => {
        return <BurgerIngredient key={ingKey + index} type={ingKey} />;
      });
    })
    .reduce((arr, el) => {
      return arr.concat(el);
    });

  if (transformedIngredients.length === 0) {
    transformedIngredients = <p>Pleae Start Adding Ingredients</p>;
  }

  return (
    <div className="Burger">
      <BurgerIngredient type="bread-top" />
      {transformedIngredients}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};

export default burger;
