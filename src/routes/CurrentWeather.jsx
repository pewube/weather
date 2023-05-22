import { useContext } from "react";

import adjustWeatherIcon from "../utils/adjustWeatherIcon";
import { AppContext } from "../context/AppContext";
import formatWindDirection from "../utils/formatWindDirection";

import { ReactComponent as Clouds } from "../assets/images/icons/info/ico-clouds.svg";
import { ReactComponent as Humidity } from "../assets/images/icons/info/ico-humid.svg";
import { ReactComponent as Pressure } from "../assets/images/icons/info/ico-bar.svg";
import { ReactComponent as Sunrise } from "../assets/images/icons/info/ico-sunrise.svg";
import { ReactComponent as Sunset } from "../assets/images/icons/info/ico-sunset.svg";
import { ReactComponent as Visibility } from "../assets/images/icons/info/ico-visibility.svg";
import { ReactComponent as WindDirection } from "../assets/images/icons/info/ico-navigation.svg";
import { ReactComponent as WindPower } from "../assets/images/icons/info/ico-wind_power.svg";

const CurrentWeather = () => {
  const { weatherData } = useContext(AppContext);
  const data = weatherData.current;

  const weatherIconCode = adjustWeatherIcon(data?.weather[0]);
  const imgWeatherSrcValue = `/assets/images/icons/weather/ico-${weatherIconCode}.svg`;

  const updateDate = new Date(weatherData?.timestamp).toLocaleDateString("pl", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  return (
    <article className="current">
      <header className="current__header">
        <section className="current__header__info">
          <p className="current__header__info__current">
            {data?.main.temp.toFixed(1)}&#176;C
          </p>
          <p className="current__info__feels-like">
            odczuwalna:{" "}
            <strong>{data?.main.feels_like.toFixed(1)}&#176;C</strong>
          </p>
          <p className="current__info__description">
            <strong>{data?.weather[0].description}</strong>
          </p>
        </section>
        <img
          className="current__header__icon-weather"
          src={imgWeatherSrcValue}
          alt={data?.weather[0].description}
          width="90"
          height="90"
        />
      </header>
      <section className="current__details">
        <p className="current__details__par--wide">
          <WindPower className="current__details__svg" />
          <strong>
            {(data?.wind.speed * 3.6).toFixed(1)}
            {data?.wind.gust && ` - ${(data.wind.gust * 3.6).toFixed(1)}`} km/h
          </strong>
          <span className="ml-1">
            <WindDirection
              className="current__details__svg wind-direction"
              style={{
                transform: `rotate(${data?.wind.deg - 180}deg)`,
                transformOrigin: "50% 50%",
              }}
            />
          </span>
          <span className="ml-10">{formatWindDirection(data?.wind.deg)}</span>
        </p>
        <p className="current__details__par">
          <Pressure className="current__details__svg" />
          <strong>{data?.main.pressure} hPa</strong>
        </p>
        <p className="current__details__par">
          <Clouds className="current__details__svg" />
          <strong>{data?.clouds.all}%</strong>
        </p>
        <p className="current__details__par">
          <Visibility className="current__details__svg" />
          <strong>{(data?.visibility / 1000).toFixed(1)} km</strong>
        </p>
        <p className="current__details__par">
          <Humidity className="current__details__svg" />
          <strong>{data?.main.humidity}%</strong>
        </p>
        <p className="current__details__par">
          <Sunrise className="current__details__svg" />
          <strong>
            {new Date(data?.sys.sunrise * 1000)
              .toLocaleTimeString()
              .slice(0, 5)}
          </strong>
        </p>
        <p className="current__details__par">
          <Sunset className="current__details__svg" />
          <strong>
            {new Date(data?.sys.sunset * 1000).toLocaleTimeString().slice(0, 5)}
          </strong>
        </p>
      </section>
      <section className="current__data-info">
        <p>
          Stacja meteo: {data?.name}, {data?.sys.country}
        </p>
        <p>Stan na: {updateDate}</p>
      </section>
    </article>
  );
};

export default CurrentWeather;
