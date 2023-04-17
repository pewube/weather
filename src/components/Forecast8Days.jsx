import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import DayForecast from "./DayForecast-previous";

const Forecast48Hours = () => {
  const { weatherForecast } = useContext(AppContext);
  console.log(weatherForecast.daily);
  const hourForecasts = weatherForecast.daily?.map((item) => (
    <DayForecast key={item.dt} data={item} />
  ));

  return <>{hourForecasts}</>;
};

export default Forecast48Hours;
