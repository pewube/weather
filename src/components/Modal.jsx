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
            <span className="material-symbols-outlined">close</span>
          </button>
          <section className="modal__body">{modal.body}</section>
        </article>
      </section>
    )
  );
};

export default Modal;
