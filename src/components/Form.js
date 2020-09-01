import React from "react";
import "../scss/Form.scss";

const Form = (props) => {
  return (
    <form className="form" onSubmit={props.onSubmit}>
      <input
        className="form__input"
        type="text"
        aria-label="city"
        placeholder="Nazwa miejscowości"
        value={props.value}
        onChange={props.onChange}
      />
      <button className="form__btn">Szukaj</button>
    </form>
  );
};

export default Form;
