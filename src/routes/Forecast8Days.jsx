import { useContext } from "react";

import { AppContext } from "../context/AppContext";
import DailyForecast from "../components/DailyForecast";

const Forecast48Hours = () => {
  const { weatherData } = useContext(AppContext);

  const hourForecasts = weatherData?.forecast?.daily?.map((item, idx) => (
    <li key={idx}>
      <DailyForecast key={item.dt} data={item} />
    </li>
  ));

  return (
    <article className="days-8 info-box">
      <header className="days-8__header">
        <h2>Prognoza 8-dniowa</h2>
      </header>
      <ul className="days-8__list">{hourForecasts}</ul>
    </article>
  );
};

export default Forecast48Hours;
