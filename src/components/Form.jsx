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
              litery - po nazwie wpisz przecinek i 2-literowy kod kraju
              (ISO3166) np.{" "}
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
          className="form__input__btn btn-clear"
          type="reset"
          onClick={handleInputResetBtn}>
          <span className="material-symbols-outlined">close</span>
        </button>
        <button className="form__btn btn-primary">Szukaj</button>
        {inputErrorInfo}
      </form>
    </>
  );
};

export default Form;
