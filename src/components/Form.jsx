import { useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";

import { AppContext } from "../context/AppContext";

const Form = () => {
  const navigate = useNavigate();

  const inputRef = useRef();

  const { inputError, setInputError } = useContext(AppContext);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (inputRef.current.value.length > 1) {
      setInputError({ is: false, info: "" });
      navigate(`/city/${inputRef.current.value}`);
    } else {
      setInputError({ is: true, info: "Nazwa miejscowości musi być dłuższa." });
    }
  };

  return (
    <>
      <form className="form" onSubmit={handleSubmit}>
        <input
          className="form__input"
          ref={inputRef}
          type="text"
          aria-label="Search city"
          placeholder="Nazwa miejscowości"
        />
        <button className="form__btn">Szukaj</button>
      </form>
      <p className="form__info">{inputError.info}</p>
    </>
  );
};

export default Form;
