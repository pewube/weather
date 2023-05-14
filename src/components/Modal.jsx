import { useContext } from "react";

import { AppContext } from "../context/AppContext";

const Modal = () => {
  const { modal, setModal } = useContext(AppContext);

  const removeModal = () => {
    setModal({ visible: false, header: {}, body: {} });
  };

  return (
    modal.visible &&
    modal.body && (
      <section className="modal">
        <article className="modal__content">
          <header className="modal__header">{modal.header}</header>
          <button onClick={removeModal} className="modal__btn-close btn-clear">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="material-symbols-outlined"
              viewBox="0 96 960 960"
              width="24">
              <path d="m256 856-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
            </svg>
          </button>
          <section className="modal__body">{modal.body}</section>
        </article>
      </section>
    )
  );
};

export default Modal;
