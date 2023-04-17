import { useContext } from "react";
import { Outlet, useParams } from "react-router-dom";

import { AppContext } from "../context/AppContext";
import Footer from "../components/Footer";
import Form from "../components/Form";
import Navigation from "../components/Navigation";

const App = () => {
  const params = useParams();
  const { appBackground } = useContext(AppContext);

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
    Object.keys(params).length === 0 || params.city ? null : (
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

  return (
    <>
      {bgImage}
      <header className={headerClassName}>
        <h1 className="header__title">Jaka pogoda ?</h1>
        <Form />
      </header>
      {navigation}
      {main}
      <Footer />
    </>
  );
};

export default App;
