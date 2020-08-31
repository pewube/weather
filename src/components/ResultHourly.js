import React from "react";
import HourForecast from "./HourForecast";
import "../scss/ResultHourly.scss";

const ResultHourly = (props) => {
  const { hourly, err } = props.state;

  const hourForecasts = hourly.map((hour, index) => (
    <HourForecast
      key={hour.dt}
      data={hour}
      windDirection={props.windDirection}
      weekDay={props.weekDay}
    />
  ));

  const showWeekdayHours = (number) => {
    if (
      hourForecasts.filter(
        (el) => new Date(el.props.data.dt * 1000).getDay() === number
      ).length > 0
    ) {
      return (
        <section className="result-hourly__list__day-list">
          <h3 className="result-hourly__list__day-list__title">
            {props.weekDay(number)}
          </h3>
          {hourForecasts.filter(
            (el) => new Date(el.props.data.dt * 1000).getDay() === number
          )}
        </section>
      );
    } else {
      return null;
    }
  };

  if (hourly.length > 0 && !err) {
    if (!!showWeekdayHours(0) && !!showWeekdayHours(6)) {
      return (
        <section className="result-hourly">
          <header className="result-hourly__header">
            <h2 className="result-hourly__header__title">
              Prognoza 48-godzinna
            </h2>
          </header>
          <section className="result-hourly__list">
            {showWeekdayHours(2)}
            {showWeekdayHours(3)}
            {showWeekdayHours(4)}
            {showWeekdayHours(5)}
            {showWeekdayHours(6)}
            {showWeekdayHours(0)}
            {showWeekdayHours(1)}
          </section>
        </section>
      );
    } else {
      return (
        <section className="result-hourly">
          <header className="result-hourly__header">
            <h2 className="result-hourly__title">Prognoza 48-godzinna</h2>
          </header>
          <section className="result-hourly__list">
            {showWeekdayHours(0)}
            {showWeekdayHours(1)}
            {showWeekdayHours(2)}
            {showWeekdayHours(3)}
            {showWeekdayHours(4)}
            {showWeekdayHours(5)}
            {showWeekdayHours(6)}
          </section>
        </section>
      );
    }
  } else {
    return null;
  }
};

export default ResultHourly;
