import { useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";

import { AppContext } from "../context/AppContext";

const Form = () => {
  const navigate = useNavigate();

  const inputRef = useRef();

  const { inputError, setInputError } = useContext(AppContext);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (inputRef.current.value.length > 2) {
      setInputError({ is: false, statusText: "" });
      navigate(`/city/${encodeURIComponent(inputRef.current.value)}`);
      inputRef.current.value = "";
    } else {
      setInputError({
        is: true,
        info: (
          <>
            <p>Nazwa miejscowości musi być dłuższa.</p>
            <p>
              Jeżeli próbujesz wyszukać miejscowość o nazwie krótszej niż 3
              litery - po nazwie wpisz przecinek i 2-literowy kod kraju np.{" "}
              <span className="example">
                A, FR (dla miejscowości A we Francji)
              </span>
            </p>
          </>
        ),
      });
    }
  };

  const handleInputResetBtn = () => {
    inputRef.current.value = "";
    inputRef.current.focus();
  };

  const inputErrorInfo = inputError.info && (
    <section className="form__info info-box info-box--warning">
      {inputError.info}
    </section>
  );

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
        <button
          onClick={handleInputResetBtn}
          className="form__input__btn btn-clear"
          type="reset"
          aria-label="Reset input text">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="material-symbols-outlined"
            viewBox="0 96 960 960"
            width="24">
            <path d="m256 856-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
          </svg>
        </button>
        <button className="form__btn btn-primary">Szukaj</button>
        {inputErrorInfo}
      </form>
    </>
  );
};

export default Form;
