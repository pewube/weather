import { useContext } from "react";
import { Link, Outlet, useNavigation, useParams } from "react-router-dom";

import { AppContext } from "../context/AppContext";
import Footer from "../components/Footer";
import Form from "../components/Form";
import Modal from "../components/Modal";
import Navigation from "../components/Navigation";
import Spinner from "../components/Spinner";

import adjustBgRes from "../adjustBgRes";

const App = () => {
  const params = useParams();
  const navigation = useNavigation();

  const { appBackground, setAppBackground, setInputError } =
    useContext(AppContext);

  const bgRes = adjustBgRes();

  const bgImage = (
    <img
      className="app-bg"
      src={`/assets/img/bg-${bgRes}-${appBackground}.webp`}
      alt=""
    />
  );

  const headerClassName =
    Object.keys(params).length === 0 ? "header header--start" : "header";

  const nav =
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
        <Link
          to="/"
          onClick={handleHomePageLinkClick}
          className="header__home-link"
          aria-label="Home page">
          <h1 className="header__title">Jaka pogoda ?</h1>
        </Link>
        <Form />
      </header>
      <div className="main-container">
        {nav}
        {main}
      </div>
      <Modal />
      <Footer />
      {navigation.state === "loading" && <Spinner />}
    </>
  );
};

export default App;
