import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import "./scss/index.scss";
// import App from "./components/App";
import AppProvider from "./context/AppContext";
import ErrorPage from "./components/ErrorPage";
import App from "./routes/App";
import Home from "./routes/Home";
import reportWebVitals from "./reportWebVitals";
import CitiesFound, { loader as citiesLoader } from "./routes/CitiesFound";
import Forecast, { loader as forecastLoader } from "./routes/Forecast";
import CurrentWeather, {
  loader as currentLoader,
} from "./routes/CurrentWeather";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/"
      element={<App />}
      // loader={rootLoader}
      // action={rootAction}
      errorElement={<ErrorPage />}>
      <Route errorElement={<ErrorPage />}>
        <Route index element={<Home />} />
        <Route
          path="/city/:city"
          element={<CitiesFound />}
          loader={citiesLoader}
        />
        <Route
          path="/current/:lat/:lon"
          element={<CurrentWeather />}
          loader={currentLoader}
        />
        <Route
          path="/48-hours/:lat/:lon"
          element={<Forecast />}
          loader={forecastLoader}
        />
        <Route
          path="/8-days/:lat/:lon"
          element={<Forecast />}
          loader={forecastLoader}
        />
      </Route>
    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AppProvider>
      <RouterProvider router={router} />
    </AppProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
