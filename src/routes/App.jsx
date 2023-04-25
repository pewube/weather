import { useContext } from "react";
import { Link, Outlet, useParams } from "react-router-dom";

import { AppContext } from "../context/AppContext";
import Footer from "../components/Footer";
import Form from "../components/Form";
import Modal from "../components/Modal";
import Navigation from "../components/Navigation";

const App = () => {
  const params = useParams();
  const { appBackground, setAppBackground, setInputError } =
    useContext(AppContext);

  const bgImage = (
    <img
      className="app-bg"
      src={`/assets/img/bg-${appBackground}.jpg`}
      alt=""
    />
  );

  const headerClassName =
    Object.keys(params).length === 0 ? "header header--start" : "header";

  const navigation =
    Object.keys(params).length === 0 || !params.lat ? null : (
      <nav className="nav">
        <Navigation />
      </nav>
    );
  const main =
    Object.keys(params).length === 0 ? null : (
      <main className="main">
        <Outlet />
      </main>
    );

  const handleHomePageLinkClick = () => {
    setAppBackground("home");
    setInputError({ is: false, statusText: "" });
  };

  return (
    <>
      {bgImage}
      <header className={headerClassName}>
        <Link to="/" onClick={handleHomePageLinkClick} aria-label="Home page">
          <h1 className="header__title">Jaka pogoda ?</h1>
        </Link>
        <Form />
      </header>
      {navigation}
      {main}
      <Modal />
      <Footer />
    </>
  );
};

export default App;
