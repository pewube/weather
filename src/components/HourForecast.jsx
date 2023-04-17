import React, { useEffect } from "react";
import windDirection from "../windDirection";

const HourForecast = (props) => {
  const {
    dt,
    temp,
    feels_like,
    weather,
    rain,
    snow,
    wind_speed,
    wind_deg,
    wind_gust,
    pressure,
    humidity,
    clouds,
    pop,
    visibility,
  } = props.data;

  const headerHour = new Date(dt * 1000).toLocaleTimeString("pl", {
    hour: "2-digit",
    minute: "2-digit",
  });
  const imgWeatherSrcValue = `/assets/img/ico-${weather[0].icon}.svg`;
  const imgWeatherAltValue = `Ikona prognozy dla godz. ${headerHour}: ${weather[0].description}`;

  const showDetails = (e) => {
    const details = e.target.parentElement.nextElementSibling;
    const detailsHeight = details.firstElementChild.offsetHeight;

    details.classList.toggle("hour-forecast__details--active");
    if (details.classList.contains("hour-forecast__details--active")) {
      details.style.height = `${detailsHeight + 15}px`;
      e.target.textContent = "-";
    } else {
      details.style.height = `0`;
      e.target.textContent = "+";
    }
  };

  useEffect(() => {
    document
      .querySelectorAll(".hour-forecast__details--active")
      .forEach((el) => {
        el.classList.remove("hour-forecast__details--active");
        el.style.height = `0`;
      });

    document
      .querySelectorAll(".hour-forecast__header__btn-details")
      .forEach((el) => {
        el.textContent = "+";
      });
  });

  return (
    <article
      className="hour-forecast"
      data-weekday-number={new Date(dt * 1000).getDay()}>
      <header className="hour-forecast__header">
        <p className="hour-forecast__header__hour">{headerHour}</p>
        <h4 className="hour-forecast__header__temp">{temp.toFixed()}&#176;C</h4>
        <p className="hour-forecast__header__wind">
          {(wind_speed * 3.6).toFixed()} km/h{" "}
          <span>{windDirection(wind_deg)}</span>
        </p>
        <figure className="hour-forecast__header__icon-weather">
          <img
            className="hour-forecast__header__icon-weather__img"
            src={imgWeatherSrcValue}
            alt={imgWeatherAltValue}
          />
        </figure>
        <button
          onClick={showDetails}
          className="hour-forecast__header__btn-details">
          +
        </button>
      </header>

      <section className="hour-forecast__details">
        <div className="hour-forecast__details-container">
          <p className="hour-forecast__details__par">
            Temp. odczuwalna: <strong>{feels_like.toFixed()}&#176;C</strong>{" "}
          </p>
          <p className="hour-forecast__details__par">
            Pogoda: <strong>{weather[0].description}</strong>
          </p>
          <p className="hour-forecast__details__par">
            Ciśnienie: <strong>{pressure} hPa</strong>
          </p>
          <p className="hour-forecast__details__par">
            Wiatr:{" "}
            <strong>
              {(wind_speed * 3.6).toFixed()} km/h
              {wind_gust
                ? ` (porywy do ${(wind_gust * 3.6).toFixed()} km/h)`
                : null}
            </strong>
            , kierunek: <strong>{windDirection(wind_deg)}</strong>
          </p>
          <p className="hour-forecast__details__par">
            Zachmurzenie: <strong>{clouds}%</strong>
          </p>
          <p className="hour-forecast__details__par">
            Widzialność: <strong>{(visibility / 1000).toFixed(1)} km</strong>{" "}
          </p>
          <p className="hour-forecast__details__par">
            Wilgotność: <strong>{humidity}%</strong>
          </p>
          {rain ? (
            <p className="hour-forecast__details__par">
              Opady deszczu: <strong>{rain["1h"]} mm</strong>
            </p>
          ) : null}
          {snow ? (
            <p>
              Opady śniegu: <strong>{snow["1h"]} mm</strong>
            </p>
          ) : null}
          <p className="hour-forecast__details__par">
            Prawdopodobieństwo opadów: <strong>{(pop * 100).toFixed()}%</strong>{" "}
          </p>
        </div>
      </section>
    </article>
  );
};

export default HourForecast;
