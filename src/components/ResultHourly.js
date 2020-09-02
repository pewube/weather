import React from "react";
import HourForecast from "./HourForecast";
import "../scss/ResultHourly.scss";

const ResultHourly = (props) => {
  const { hourly, err } = props.state;

  const hourForecasts = hourly.map((hour) => (
    <HourForecast
      key={hour.dt}
      data={hour}
      windDirection={props.windDirection}
    />
  ));

  const showWeekdayHours = (weekDay) => {
    if (
      hourForecasts.filter(
        (el) =>
          new Date(el.props.data.dt * 1000).toLocaleDateString("pl", {
            weekday: "long",
          }) === weekDay
      ).length > 0
    ) {
      return (
        <section className="result-hourly__list__day-list">
          <h3 className="result-hourly__list__day-list__title">{weekDay}</h3>
          {hourForecasts.filter(
            (el) =>
              new Date(el.props.data.dt * 1000).toLocaleDateString("pl", {
                weekday: "long",
              }) === weekDay
          )}
        </section>
      );
    } else {
      return null;
    }
  };

  if (hourly.length > 0 && !err) {
    if (!!showWeekdayHours("niedziela") && !!showWeekdayHours("sobota")) {
      return (
        <section className="result-hourly">
          <header className="result-hourly__header">
            <h2 className="result-hourly__header__title">
              Prognoza 48-godzinna
            </h2>
          </header>
          <section className="result-hourly__list">
            {showWeekdayHours("środa")}
            {showWeekdayHours("czwartek")}
            {showWeekdayHours("piątek")}
            {showWeekdayHours("sobota")}
            {showWeekdayHours("niedziela")}
            {showWeekdayHours("poniedziałek")}
            {showWeekdayHours("wtorek")}
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
            {showWeekdayHours("niedziela")}
            {showWeekdayHours("poniedziałek")}
            {showWeekdayHours("wtorek")}
            {showWeekdayHours("środa")}
            {showWeekdayHours("czwartek")}
            {showWeekdayHours("piątek")}
            {showWeekdayHours("sobota")}
          </section>
        </section>
      );
    }
  } else {
    return null;
  }
};

export default ResultHourly;
