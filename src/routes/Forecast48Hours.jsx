import { useContext } from "react";

import { AppContext } from "../context/AppContext";
import formatDayList from "../utils/formatDayList";
import HourlyForecast from "../components/HourlyForecast";

const Forecast48Hours = () => {
  const { weatherData } = useContext(AppContext);

  const dayList = formatDayList(weatherData?.forecast?.hourly);

  const hourlyForecastsPerDay = (day) => {
    const hourlyForecasts = weatherData?.forecast?.hourly?.map((item) => (
      <HourlyForecast key={item.dt} data={item} group={day} />
    ));

    return hourlyForecasts;
  };

  const forecastList = dayList
    ? dayList.map((day, idx) => (
        <li key={idx} className="hours-48__day">
          <h3 className="hours-48__day__header">{day}</h3>
          {hourlyForecastsPerDay(day)}
        </li>
      ))
    : null;

  return (
    <article className="hours-48 info-box">
      <header className="hours-48__header">
        <h2>Prognoza 48-godzinna</h2>
      </header>
      <ul className="hours-48__list">{forecastList}</ul>
    </article>
  );
};

export default Forecast48Hours;
