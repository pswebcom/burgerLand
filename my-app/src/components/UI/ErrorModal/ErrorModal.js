import React from "react";
import "./ErrorModal.css";
import Backdrop from "../Backdrop/Backdrop";
import Button from "../Button/Button";

const ErrorModal = (props) => {
  return (
    <React.Fragment>
      <Backdrop show={props.showError} hideBackdrop={props.hideBackdrop} />
      <div
        className="ui active modal"
        style={{
          display: props.showError ? "" : "none",
        }}
      >
        <p className="message">{props.message}</p>
        <Button
          size="massive"
          color="green"
          className="btn"
          btnClicked={props.btnClicked}
        >
          Got It
        </Button>
      </div>
    </React.Fragment>
  );
};
export default ErrorModal;
