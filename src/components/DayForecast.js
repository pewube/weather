import React, { useEffect } from "react";
import "../scss/DayForecast.scss";

const DayForecast = (props) => {
  const {
    dt,
    temp,
    feels_like,
    weather,
    sunrise,
    sunset,
    rain,
    snow,
    wind_speed,
    wind_deg,
    wind_gust,
    pressure,
    humidity,
    clouds,
    uvi,
    pop,
  } = props.data;

  const headerDate = new Date(dt * 1000).toLocaleDateString().slice(0, 5);
  const imgWeatherSrcValue = `/assets/img/ico-${weather[0].icon}.svg`;
  const imgWeatherAltValue = `Ikona prognozy dla ${headerDate}: ${weather[0].description}`;

  const showDetails = (e) => {
    const details = e.target.parentElement.nextElementSibling;
    const detailsHeight = details.firstElementChild.offsetHeight;
    details.classList.toggle("day-forecast__details--active");
    if (details.classList.contains("day-forecast__details--active")) {
      details.style.height = `${detailsHeight + 15}px`;
      e.target.textContent = "-";
    } else {
      details.style.height = `0`;
      e.target.textContent = "+";
    }
  };

  useEffect(() => {
    document
      .querySelectorAll(".day-forecast__details--active")
      .forEach((el) => {
        el.classList.remove("day-forecast__details--active");
        el.style.height = `0`;
      });

    document
      .querySelectorAll(".day-forecast__header__btn-details")
      .forEach((el) => {
        el.textContent = "+";
      });
  });

  return (
    <article className="day-forecast">
      <header className="day-forecast__header">
        <section className="day-forecast__header__date">
          <h3 className="day-forecast__header__date--number">{headerDate}</h3>
          <p className="day-forecast__header__date--weekday">
            {props.weekDay(new Date(dt * 1000).getDay())}
          </p>
        </section>
        <section className="day-forecast__header__temp">
          <h3 className="day-forecast__header__temp__max">
            {temp.max.toFixed()}&#176;C
          </h3>
          <p className="day-forecast__header__temp__min">
            {temp.min.toFixed()}&#176;C
          </p>
        </section>
        <figure className="day-forecast__header__icon-weather">
          <img
            className="day-forecast__header__icon-weather__img"
            src={imgWeatherSrcValue}
            alt={imgWeatherAltValue}
          />
        </figure>
        <button
          onClick={showDetails}
          className="day-forecast__header__btn-details">
          +
        </button>
      </header>

      <section className="day-forecast__details">
        <div className="day-forecast__details__contener">
          <p className="day-forecast__details__par">
            <strong>{temp.morn.toFixed()}&#176;C</strong> rano (odczuwalna:{" "}
            <strong>{feels_like.morn.toFixed()}&#176;C</strong>)
          </p>
          <p className="day-forecast__details__par">
            <strong>{temp.day.toFixed()}&#176;C</strong> w dzień (odczuwalna:{" "}
            <strong>{feels_like.day.toFixed()}&#176;C</strong>)
          </p>
          <p className="day-forecast__details__par">
            <strong>{temp.eve.toFixed()}&#176;C</strong> wieczorem (odczuwalna:{" "}
            <strong>{feels_like.eve.toFixed()}&#176;C</strong>)
          </p>
          <p className="day-forecast__details__par">
            <strong>{temp.night.toFixed()}&#176;C</strong> nocą (odczuwalna:{" "}
            <strong>{feels_like.night.toFixed()}&#176;C</strong>)
          </p>
          <p className="day-forecast__details__par">
            Pogoda: <strong>{weather[0].description}</strong>
          </p>
          <p className="day-forecast__details__par">
            Ciśnienie: <strong>{pressure} hPa</strong>
          </p>
          <p className="day-forecast__details__par">
            Wiatr:{" "}
            <strong>
              {(wind_speed * 3.6).toFixed()} km/h
              {wind_gust
                ? ` (w porywach do ${(wind_gust * 3.6).toFixed()} km/h)`
                : null}
            </strong>
            , kierunek: <strong>{props.windDirection(wind_deg)}</strong>
          </p>
          <p className="day-forecast__details__par">
            Zachmurzenie: <strong>{clouds}%</strong>
          </p>
          <p className="day-forecast__details__par">
            Index UV: <strong>{uvi}</strong>
          </p>
          <p className="day-forecast__details__par">
            Wilgotność: <strong>{humidity}%</strong>
          </p>
          {rain ? (
            <p>
              Opady deszczu: <strong>{rain} mm</strong>
            </p>
          ) : null}
          {snow ? (
            <p>
              Opady śniegu: <strong>{snow} mm</strong>
            </p>
          ) : null}
          <p className="day-forecast__details__par">
            Prawdopodobieństwo opadów: <strong>{(pop * 100).toFixed()}%</strong>
          </p>
          <p className="day-forecast__details__par">
            Wschód słońca:{" "}
            <strong>
              godz. {new Date(sunrise * 1000).toLocaleTimeString().slice(0, 5)}
            </strong>
          </p>
          <p className="day-forecast__details__par">
            Zachód słońca:{" "}
            <strong>
              godz. {new Date(sunset * 1000).toLocaleTimeString().slice(0, 5)}
            </strong>
          </p>
        </div>
      </section>
    </article>
  );
};

export default DayForecast;
