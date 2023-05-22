import { useEffect, useId, useRef, useState } from "react";

import adjustWeatherIcon from "../utils/adjustWeatherIcon";
import formatWindDirection from "../utils/formatWindDirection";

import { ReactComponent as WindDirection } from "../assets/images/icons/info/ico-navigation.svg";
import { ReactComponent as BtnExpandMore } from "../assets/images/icons/btn/btn-expand_more.svg";
import { ReactComponent as BtnExpandLess } from "../assets/images/icons/btn/btn-expand_less.svg";

const DailyForecast = (props) => {
  const [detailsVisible, setDetailsVisible] = useState(false);
  const containerRef = useRef(); //details container
  const detailsRef = useRef();
  const detailsId = useId();

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

  const headerDate = new Date(dt * 1000).toLocaleDateString("pl", {
    day: "2-digit",
    month: "2-digit",
  });

  const weekDay = new Date(dt * 1000).toLocaleDateString("pl", {
    weekday: "long",
  });

  const weatherIconCode = adjustWeatherIcon(weather[0]);
  const imgWeatherSrcValue = `/assets/images/icons/weather/ico-${weatherIconCode}.svg`;

  useEffect(() => {
    if (detailsRef.current) {
      detailsVisible
        ? (detailsRef.current.style.height = `${containerRef.current?.offsetHeight}px`)
        : (detailsRef.current.style.height = "0");
    }
  }, [detailsVisible]);

  const showDetails = (e) => {
    setDetailsVisible((prev) => !prev);
  };

  return (
    <article className="day">
      <header className="day__header">
        <section className="day__header__date">
          <h3>{headerDate}</h3>
          <p className="day__header__date__weekday">{weekDay}</p>
        </section>
        <section className="day__header__temp">
          <p className="day__header__temp__max">
            <strong>{temp.max.toFixed()}&#176;C</strong>
          </p>
          <p className="day__header__temp__min">{temp.min.toFixed()}&#176;C</p>
        </section>
        <img
          className="day__header__icon-weather"
          src={imgWeatherSrcValue}
          alt={weather[0].description}
          width="40"
          height="40"
        />
        <button
          onClick={showDetails}
          className="day__header__btn-details btn-clear"
          type="button"
          aria-expanded={detailsVisible ? true : false}
          aria-controls={`collapse-hour-${detailsId}`}
          aria-label={detailsVisible ? "Hide details" : "Show details"}>
          {detailsVisible ? (
            <BtnExpandLess className="material-symbols-outlined" />
          ) : (
            <BtnExpandMore className="material-symbols-outlined" />
          )}
        </button>
      </header>

      <section
        id={`collapse-hour-${detailsId}`}
        className="day__details"
        ref={detailsRef}>
        {detailsVisible && (
          <div className="day__details__container" ref={containerRef}>
            <p className="day__details__par">
              <strong>{temp.morn.toFixed()}&#176;C</strong>{" "}
              <span className="descr">
                rano (odczuwalna:{" "}
                <strong>{feels_like.morn.toFixed()}&#176;C</strong>)
              </span>
            </p>
            <p className="day__details__par">
              <strong>{temp.day.toFixed()}&#176;C</strong>{" "}
              <span className="descr">
                w dzień (odczuwalna:{" "}
                <strong>{feels_like.day.toFixed()}&#176;C</strong>)
              </span>
            </p>
            <p className="day__details__par">
              <strong>{temp.eve.toFixed()}&#176;C</strong>{" "}
              <span className="descr">
                wieczorem (odczuwalna:{" "}
                <strong>{feels_like.eve.toFixed()}&#176;C</strong>)
              </span>
            </p>
            <p className="day__details__par">
              <strong>{temp.night.toFixed()}&#176;C</strong>{" "}
              <span className="descr">
                nocą (odczuwalna:{" "}
                <strong>{feels_like.night.toFixed()}&#176;C</strong>)
              </span>
            </p>
            <p className="day__details__par">
              <span className="descr">Pogoda: </span>
              <strong>{weather[0].description}</strong>
            </p>
            <p className="day__details__par">
              <span className="descr">Ciśnienie: </span>
              <strong>{pressure} hPa</strong>
            </p>
            <p className="day__details__par">
              <span className="descr">Wiatr: </span>
              <strong>
                {(wind_speed * 3.6).toFixed(1)}
                {wind_gust && ` - ${(wind_gust * 3.6).toFixed(1)}`} km/h
              </strong>
              <span className="ml-10">
                <WindDirection
                  className="wind-direction"
                  style={{
                    transform: `rotate(${wind_deg - 180}deg)`,
                    transformOrigin: "50% 50%",
                  }}
                />
              </span>
              <strong className="ml-5">{formatWindDirection(wind_deg)}</strong>
            </p>
            <p className="day__details__par">
              <span className="descr">Zachmurzenie: </span>
              <strong>{clouds}%</strong>
            </p>
            <p className="day__details__par">
              <span className="descr">Index UV: </span>
              <strong>{uvi}</strong>
            </p>
            <p className="day__details__par">
              <span className="descr">Wilgotność: </span>
              <strong>{humidity}%</strong>
            </p>
            {rain ? (
              <p>
                <span className="descr">Opady deszczu: </span>
                <strong>{rain} mm</strong>
              </p>
            ) : null}
            {snow ? (
              <p>
                <span className="descr">Opady śniegu: </span>
                <strong>{snow} mm</strong>
              </p>
            ) : null}
            <p className="day__details__par">
              <span className="descr">Prawdopodobieństwo opadów: </span>
              <strong>{(pop * 100).toFixed()}%</strong>
            </p>
            <p className="day__details__par">
              <span className="descr">Wschód słońca: </span>
              <strong>
                {new Date(sunrise * 1000).toLocaleTimeString().slice(0, 5)}
              </strong>
            </p>
            <p className="day__details__par">
              <span className="descr">Zachód słońca: </span>
              <strong>
                {new Date(sunset * 1000).toLocaleTimeString().slice(0, 5)}
              </strong>
            </p>
          </div>
        )}
      </section>
    </article>
  );
};

export default DailyForecast;
