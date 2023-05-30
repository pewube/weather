import {
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { Outlet, useNavigation, useParams } from "react-router-dom";

import adjustBgRes from "../utils/adjustBgRes";
import { AppContext } from "../context/AppContext";
import { createDB } from "../data/storeFavoriteLocations";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Modal from "../components/Modal";
import Navigation from "../components/Navigation";
import Spinner from "../components/Spinner";

const App = () => {
  const { appBackground, setAppBackground, setInputError } =
    useContext(AppContext);
  const navigation = useNavigation();
  const params = useParams();
  const spinnerWrapperRef = useRef();
  const [bgImageLoaded, setBgImageLoaded] = useState(false);
  const [spinnerIsOn, setSpinnerIsOn] = useState(true);

  const bgRes = adjustBgRes();

  const bgImage = (
    <img
      className="app-bg"
      src={`/assets/images/bg/bg-${bgRes}-${appBackground}.webp`}
      alt=""
      onLoad={() => {
        setBgImageLoaded(true);
      }}
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

  createDB();

  useLayoutEffect(() => {
    setBgImageLoaded(false);
  }, [appBackground]);

  useEffect(() => {
    if (navigation.state === "loading" || !bgImageLoaded) {
      setSpinnerIsOn(true);
    } else {
      setTimeout(() => {
        if (spinnerWrapperRef && spinnerWrapperRef.current) {
          spinnerWrapperRef.current.classList.add("fade-out");
        }
      }, 0);

      setTimeout(() => {
        setSpinnerIsOn(false);
      }, 250);
    }
  }, [bgImageLoaded, navigation.state, spinnerIsOn]);

  return (
    <>
      {bgImage}
      <header className={headerClassName}>
        <Header handleHomeLinkClick={handleHomePageLinkClick} />
      </header>
      <div className="main-container">
        {nav}
        {main}
      </div>
      <Modal />
      <Footer />
      {spinnerIsOn && (
        <div className="spinner-wrapper" ref={spinnerWrapperRef}>
          <Spinner />
        </div>
      )}
    </>
  );
};

export default App;
