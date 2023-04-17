import { useContext } from "react";

import { AppContext } from "../context/AppContext";

const Modal = (props) => {
  const { modalVisible, setModalVisible } = useContext(AppContext);
  console.log("modalVisible:", modalVisible);
  const removeModal = () => {
    setModalVisible(false);
  };

  return (
    modalVisible && (
      <section className="modal">
        <article className="modal__body">
          <header className="modal__header">
            <button onClick={removeModal} className="btn--close">
              <span className="material-symbols-outlined">close</span>
            </button>
          </header>
          <section className="modal__content">{props.children}</section>
        </article>
      </section>
    )
  );
};

export default Modal;
