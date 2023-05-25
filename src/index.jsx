import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import App from "./routes/App";
import AppProvider from "./context/AppContext";
import CitiesFound, { loader as citiesLoader } from "./routes/CitiesFound";
import CurrentWeather from "./routes/CurrentWeather";
import ErrorPage from "./routes/ErrorPage";
import Forecast, { loader as weatherLoader } from "./routes/Forecast";
import Forecast48Hours from "./routes/Forecast48Hours";
import Forecast8Days from "./routes/Forecast8Days";

import "./assets/scss/index.scss";
import "/node_modules/flag-icons/css/flag-icons.min.css";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />} errorElement={<ErrorPage />}>
      <Route errorElement={<ErrorPage />}>
        <Route
          path="/city/:city"
          element={<CitiesFound />}
          loader={citiesLoader}
        />
        <Route
          path="/:city/:country/:lat/:lon"
          element={<Forecast />}
          loader={weatherLoader}>
          <Route
            path="/:city/:country/:lat/:lon/now"
            element={<CurrentWeather />}
          />
          <Route
            path="/:city/:country/:lat/:lon/48-hours"
            element={<Forecast48Hours />}
          />
          <Route
            path="/:city/:country/:lat/:lon/8-days"
            element={<Forecast8Days />}
          />
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
