import React from "react";
import "../scss/Form.scss";

const Form = (props) => {
  return (
    <form className="form" onSubmit={props.onSubmit}>
      <label className="form__input__label" htmlFor="input-city">
        Jaka pogoda ?
      </label>
      <input
        className="form__input"
        id="input-city"
        type="text"
        value={props.value}
        placeholder="Nazwa miejscowości"
        onChange={props.onChange}
      />
      <button className="form__btn">Szukaj</button>
    </form>
  );
};

export default Form;
