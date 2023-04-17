import { useContext, useLayoutEffect } from "react";
import { useMatch, useLoaderData } from "react-router-dom";
import { apiKey } from "../config";
import { AppContext } from "../context/AppContext";
import Forecast48Hours from "../components/Forecast48Hours";
import Forecast8Days from "../components/Forecast8Days";

export async function loader({ params }) {
  const apiForecast = `https://api.openweathermap.org/data/2.5/onecall?lat=${params.lat}&lon=${params.lon}&exclude=current,minutely&appid=${apiKey}&units=metric&lang=pl`;

  const weatherForecast = await fetch(apiForecast)
    .then((response) => {
      if (response.ok) {
        return response;
      }
      throw Error(`Błąd połączenia z serwerem. Kod: ${response.status}`);
    })
    .then((response) => response.json())
    .then((data) => {
      // console.log("apiForecast ", data);
      return data;
    })
    .catch((err) => {
      return err;
    });

  return weatherForecast;
}

const Forecast = () => {
  const data = useLoaderData();
  const { setWeatherForecast } = useContext(AppContext);

  useLayoutEffect(() => {
    console.log("useLayoutEffect Forecast");
    setWeatherForecast(data);
  });

  const location48Hours = useMatch("/48-hours/:lat/:lon");
  const location8Days = useMatch("/8-days/:lat/:lon");

  return location48Hours ? (
    <Forecast48Hours />
  ) : location8Days ? (
    <Forecast8Days />
  ) : null;
};

export default Forecast;
