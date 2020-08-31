import React from "react";
import DayForecast from "./DayForecast";
import "../scss/ResultDaily.scss";

const ResultDaily = (props) => {
  const { daily, err } = props.state;

  const dayForecasts = daily.map((day, index) => (
    <DayForecast
      key={index}
      data={day}
      windDirection={props.windDirection}
      weekDay={props.weekDay}
    />
  ));

  if (daily.length > 0 && !err) {
    return (
      <section className="result-daily">
        <header className="result-daily__header">
          <h2 className="result-daily__header__title">Prognoza 7-dniowa</h2>
        </header>
        <section className="result-daily__list">{dayForecasts}</section>
      </section>
    );
  } else {
    return null;
  }
};

export default ResultDaily;
