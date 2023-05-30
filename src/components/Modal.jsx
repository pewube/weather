import { useContext, useEffect, useRef } from "react";

import { AppContext } from "../context/AppContext";

import { ReactComponent as BtnClose } from "../assets/images/icons/btn/btn-close.svg";

const Modal = () => {
  const { modal, setModal } = useContext(AppContext);
  const modalRef = useRef();
  const contentRef = useRef();

  const removeModal = () => {
    contentRef.current.classList.remove("visible");
    setTimeout(() => {
      modalRef.current.classList.remove("visible");
    }, 300);
    setTimeout(() => {
      setModal({ visible: false, header: {}, body: {} });
    }, 500);
  };

  useEffect(() => {
    if (modalRef.current && contentRef.current) {
      modalRef.current.classList.add("visible");
      setTimeout(() => {
        contentRef.current.classList.add("visible");
      }, 300);
    }
  }, [modal]);

  return (
    modal.visible &&
    (modal.body || modal.header) && (
      <section className="modal" ref={modalRef}>
        <article className="modal__content" ref={contentRef}>
          {modal.header && (
            <header className="modal__header">{modal.header}</header>
          )}
          <button onClick={removeModal} className="modal__btn-close btn-clear">
            <BtnClose className="material-symbols-outlined" />
          </button>
          {modal.body && (
            <section className="modal__body">{modal.body}</section>
          )}
        </article>
      </section>
    )
  );
};

export default Modal;
