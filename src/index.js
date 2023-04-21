import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import reportWebVitals from "./reportWebVitals";

import "./scss/index.scss";

import App from "./routes/App";
import AppProvider from "./context/AppContext";
import CitiesFound, { loader as citiesLoader } from "./routes/CitiesFound";
import CurrentWeather from "./routes/CurrentWeather";
import ErrorPage from "./components/ErrorPage";
import Forecast, { loader as weatherLoader } from "./routes/Forecast";
import Forecast48Hours from "./routes/Forecast48Hours";
import Forecast8Days from "./routes/Forecast8Days";
import MainErrorPage from "./components/MainErrorPage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />} errorElement={<MainErrorPage />}>
      <Route errorElement={<ErrorPage />}>
        <Route
          path="/city/:city"
          element={<CitiesFound />}
          loader={citiesLoader}
        />
        <Route
          path="/:city/:lat/:lon"
          element={<Forecast />}
          loader={weatherLoader}>
          <Route path="/:city/:lat/:lon/current" element={<CurrentWeather />} />
          <Route
            path="/:city/:lat/:lon/48-hours"
            element={<Forecast48Hours />}
          />
          <Route path="/:city/:lat/:lon/8-days" element={<Forecast8Days />} />
        </Route>
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
