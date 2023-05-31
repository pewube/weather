import { useEffect, useId, useRef, useState } from "react";

import adjustWeatherIcon from "../utils/adjustWeatherIcon";
import formatDayName from "../utils/formatDayName";
import formatWindDirection from "../utils/formatWindDirection";

import { ReactComponent as WindDirection } from "../assets/images/icons/info/ico-navigation.svg";
import { ReactComponent as BtnExpandMore } from "../assets/images/icons/btn/btn-expand_more.svg";
import { ReactComponent as BtnExpandLess } from "../assets/images/icons/btn/btn-expand_less.svg";

const HourlyForecast = (props) => {
  const [detailsVisible, setDetailsVisible] = useState(false);
  const containerRef = useRef();
  const detailsRef = useRef();
  const detailsId = useId();

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

  const weatherIconCode = adjustWeatherIcon(weather[0]);
  const imgWeatherSrcValue = `/assets/images/icons/weather/ico-${weatherIconCode}.svg`;

  useEffect(() => {
    if (detailsRef.current) {
      detailsVisible
        ? (detailsRef.current.style.height = `${containerRef.current?.offsetHeight}px`)
        : (detailsRef.current.style.height = "0");
    }
  }, [detailsVisible]);

  const handleDetailsBtn = () => {
    if (detailsRef.current && detailsVisible) {
      detailsRef.current.style.height = "0";
      setTimeout(() => {
        setDetailsVisible((prev) => !prev);
      }, 200);
    } else {
      setDetailsVisible((prev) => !prev);
    }
  };

  return (
    props.group === formatDayName(dt) && (
      <article className="hour">
        <header className="hour__header">
          <p className="hour__header__hour">{headerHour}</p>
          <p className="hour__header__temp">
            <strong>{temp.toFixed()}&#176;C</strong>
          </p>
          <p className="hour__header__wind">
            {(wind_speed * 3.6).toFixed()} <span className="descr">km/h</span>{" "}
            <span className="ml-5">
              <WindDirection
                className="wind-direction"
                style={{
                  transform: `rotate(${wind_deg - 180}deg)`,
                  transformOrigin: "50% 50%",
                }}
              />
            </span>
          </p>
          <img
            className="hour__header__icon-weather"
            src={imgWeatherSrcValue}
            alt={weather[0].description}
            width="30"
            height="30"
          />
          <button
            onClick={handleDetailsBtn}
            className="hour__header__btn-details btn-clear"
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
          className="hour__details"
          ref={detailsRef}>
          {detailsVisible && (
            <div className="hour__details__container" ref={containerRef}>
              <p className="hour__details__par">
                <span className="descr">Temp. odczuwalna:</span>{" "}
                <strong>{feels_like.toFixed()}&#176;C</strong>{" "}
              </p>
              <p className="hour__details__par">
                <span className="descr">Pogoda:</span>{" "}
                <strong>{weather[0].description}</strong>
              </p>
              <p className="hour__details__par">
                <span className="descr">Ciśnienie:</span>{" "}
                <strong>{pressure} hPa</strong>
              </p>
              <p className="hour__details__par">
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
                <strong className="ml-5">
                  {formatWindDirection(wind_deg)}
                </strong>
              </p>
              <p className="hour__details__par">
                <span className="descr">Zachmurzenie:</span>{" "}
                <strong>{clouds}%</strong>
              </p>
              <p className="hour__details__par">
                <span className="descr">Widzialność:</span>{" "}
                <strong>{(visibility / 1000).toFixed(1)} km</strong>{" "}
              </p>
              <p className="hour__details__par">
                <span className="descr">Wilgotność:</span>{" "}
                <strong>{humidity}%</strong>
              </p>
              {rain ? (
                <p className="hour__details__par">
                  <span className="descr">Opady deszczu:</span>{" "}
                  <strong>{rain["1h"]} mm</strong>
                </p>
              ) : null}
              {snow ? (
                <p>
                  <span className="descr">Opady śniegu:</span>{" "}
                  <strong>{snow["1h"]} mm</strong>
                </p>
              ) : null}
              <p className="hour__details__par">
                <span className="descr">Prawdopodobieństwo opadów:</span>{" "}
                <strong>{(pop * 100).toFixed()}%</strong>{" "}
              </p>
            </div>
          )}
        </section>
      </article>
    )
  );
};

export default HourlyForecast;
