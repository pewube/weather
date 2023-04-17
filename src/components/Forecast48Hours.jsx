import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import HourForecast from "./HourForecast";

const Forecast48Hours = () => {
  const { weatherForecast } = useContext(AppContext);
  console.log(weatherForecast.hourly);
  const hourForecasts = weatherForecast.hourly?.map((item) => (
    <HourForecast key={item.dt} data={item} />
  ));

  return <>{hourForecasts}</>;
};

export default Forecast48Hours;
