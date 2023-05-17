import { useContext } from "react";

import { AppContext } from "../context/AppContext";

import { ReactComponent as BtnClose } from "../assets/images/icons/btn/btn-close.svg";

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
            <BtnClose className="material-symbols-outlined" />
          </button>
          <section className="modal__body">{modal.body}</section>
        </article>
      </section>
    )
  );
};

export default Modal;
