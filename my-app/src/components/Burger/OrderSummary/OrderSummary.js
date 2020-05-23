import React from "react";
import "./OrderSummary.css";

const orderSummary = (props) => {
  //bread

  let bread = (
    <div className="ui label large bread brown">{props.breadSelected}</div>
  );

  //sauce
  let sauceArr = Object.keys(props.sauces) //it will be ["ranch","mayo","hot"]
    .filter((sauceKey) => {
      return props.sauces[sauceKey] === true; //only whose values are true will be returned
    })
    .map((item) => (
      <div className="ui label large brown" key={item}>
        {/* names will be displayed here  */}
        {item + " Sauce"}
      </div>
    ));

  //ingredients

  let ingredientSummary = Object.keys(props.ingredients)
    .filter((ingKey) => {
      //only those ingredients  will be returned which are > 0 becoz return props.ingredients[ingKey];
      return props.ingredients[ingKey];
    })
    .map((item) => (
      <div className="ui label large brown " key={item}>
        {item}
        <div className="detail">{props.ingredients[item]}</div>
      </div>
    ));

  //here ingrArr will only recieve only those ingredients which are > 0 becoz return props.ingredients[ingKey];
  // let ingrArr = Object.keys(props.ingredients).filter((ingKey) => {
  //   console.log(props.ingredients["salad"]);
  //   return props.ingredients[ingKey]; //["Bacon","Meat","Cheese"]
  // });

  // let ingredientSummary = Object.keys(props.ingredients).map((ingKey) => {
  //   let x = ingrArr.includes(ingKey) ? (
  //     <div className="ui label large " key={ingKey}>
  //       {ingKey}
  //       <div className="detail">{props.ingredients[ingKey]}</div>
  //     </div>
  //   ) : (
  //     ""
  //   );

  //   return x;
  // });

  return (
    <div className="OrderSummary" style={{ backgroundColor: "red!important" }}>
      <div>{ingredientSummary}</div>
      <div>{sauceArr}</div>
      <div>{bread}</div>
    </div>
  );
};
export default orderSummary;
