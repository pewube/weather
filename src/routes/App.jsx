import { useContext, useEffect, useRef } from "react";
import { Link, Outlet, useNavigation, useParams } from "react-router-dom";

import adjustBgRes from "../utils/adjustBgRes";
import { AppContext } from "../context/AppContext";
import Footer from "../components/Footer";
import Form from "../components/Form";
import Modal from "../components/Modal";
import Navigation from "../components/Navigation";
import Spinner from "../components/Spinner";

const App = () => {
  const {
    appBackground,
    bgImageLoaded,
    setAppBackground,
    setInputError,
    setBgImageLoaded,
  } = useContext(AppContext);
  const navigation = useNavigation();
  const params = useParams();
  const bgImgRef = useRef();

  const bgRes = adjustBgRes();

  const bgImage = (
    <img
      className="app-bg"
      src={`/assets/images/bg/bg-${bgRes}-${appBackground}.webp`}
      alt=""
      onLoad={() => {
        setBgImageLoaded(true);
      }}
      ref={bgImgRef}
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

  const prevBgImgSrc = bgImgRef.current?.src;

  useEffect(() => {
    // check if the background image has changed, if so set it as unloaded
    if (prevBgImgSrc && prevBgImgSrc !== bgImgRef.current?.src) {
      setBgImageLoaded(false);
    }
  }, [appBackground]);

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
      {(navigation.state === "loading" || !bgImageLoaded) && <Spinner />}
    </>
  );
};

export default App;
