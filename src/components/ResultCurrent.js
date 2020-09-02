import React from "react";
import "../scss/ResultCurrent.scss";

const ResultCurrent = (props) => {
  const {
    city,
    country,
    date,
    err,
    errInfo,
    pressure,
    sunrise,
    sunset,
    temp,
    tempFeelsLike,
    windDeg,
    windSpeed,
    windGust,
    clouds,
    description,
    visibility,
    iconWeather,
    humidity,
  } = props.state;

  if (!city && !err) {
    return (
      <div className="result-current--err">
        <h1 className="result-current--err__title">Jaka pogoda ?</h1>
      </div>
    );
  } else if (err) {
    return (
      <div className="result-current--err">
        <h1 className="result-current--err__title">{errInfo}</h1>
      </div>
    );
  } else {
    const headerDate = new Date(date).toLocaleDateString("pl", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
    const imgWeatherSrcValue = `/assets/img/ico-${iconWeather}.svg`;
    const imgWeatherAltValue = `Ikona prognozy dla ${headerDate}: ${description}`;
    return (
      <article className="result-current">
        <header className="result-current__header">
          <h1 className="result-current__header__title">
            {city}
            <span className="result-current__span--country">, {country}</span>
          </h1>
          <p className="result-current__header__subtitle">
            Aktualizacja: {headerDate}
          </p>
          <section className="result-current__header__info">
            <section className="result-current__header__temp-info">
              <p className="result-current__header__temp-info__current">
                {temp}&#176;C
              </p>
              <p className="result-current__temp-info__feels-like">
                odczuwalna: <strong>{tempFeelsLike}&#176;C</strong>
              </p>
              <p className="result-current__temp-info__description">
                <strong>{description}</strong>
              </p>
            </section>
            <figure className="result-current__header__icon-weather">
              <img
                className="result-current__header__icon-weather__img"
                src={imgWeatherSrcValue}
                alt={imgWeatherAltValue}
              />
            </figure>
          </section>
        </header>

        <section className="result-current__details-container">
          <p className="result-current__details__par--wide">
            <svg
              className="result-current__details__svg"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 485 485">
              <title>Wind speed</title>
              <path d="M461.1 162.2l-260.6-42.9c-3.2-.5-6.4.5-8.7 2.8l-70.1 69.7V83.6c18.7-4.5 32.6-21.3 32.6-41.2C154.3 19 135.2 0 111.7 0S69.1 19 69.1 42.4c0 20 13.9 36.7 32.6 41.2V465H25.5c-5.5 0-10 4.5-10 10s4.5 10 10 10h172.6c5.5 0 10-4.5 10-10s-4.5-10-10-10h-76.3V239.7l70.1 69.1c1.9 1.9 4.4 2.9 7 2.9.5 0 1.1 0 1.6-.1l260.6-42.9c4.8-.8 8.4-5 8.4-9.9v-86.7c0-5-3.5-9.1-8.4-9.9zM89.2 42.4C89.2 30 99.3 20 111.8 20c12.5 0 22.6 10 22.6 22.4s-10.1 22.4-22.6 22.4-22.6-10-22.6-22.4zm99.7 235.3l-62.9-62 62.9-62.6v124.6zm86.3 1.2l-66.3 10.9V140.9l66.3 10.9v127.1zm87.1-14.3l-67.1 11.1V155.1l67.1 11.1v98.4zm87.2-14.4l-67.1 11.1v-91.8l67.1 11v69.7z" />
            </svg>
            <strong>{(windSpeed * 3.6).toFixed()} km/h</strong>
            {windGust
              ? ` (porywy do ${(windGust * 3.6).toFixed()} km/h)`
              : null}
          </p>
          <p className="result-current__details__par--wide">
            <svg
              className="result-current__details__svg"
              viewBox="0 0 487.91 487.91"
              xmlns="http://www.w3.org/2000/svg">
              <title>Wind direction</title>
              <path
                d="M245.49 37.151c-115.15 0-208.83 93.682-208.83 208.83 0 115.15 93.682 208.83 208.83 208.83 115.15 0 208.83-93.682 208.83-208.83 0-115.15-93.682-208.83-208.83-208.83zm22.664 229.56l-108.89 63.679 62.423-107.24 109.66-60.441z"
                fill="none"
                stroke="#fff"
                strokeWidth="20"
              />
              <path
                fill="none"
                d="M191.08 298.064l76.284-38.135 32.903-67.148-74.75 33.651z"
              />
              <path d="M179.76 306.71c.891-.964 46.397-80.138 46.719-80.157.745-.045 34.986 32.483 34.59 32.859-.235.224-18.079 10.716-39.654 23.316-21.574 12.6-39.819 23.288-40.543 23.751-.724.463-20.105 20.762-1.113.23z" />
            </svg>
            <strong>{props.windDirection(windDeg)}</strong>
          </p>
          <p className="result-current__details__par">
            <svg
              className="result-current__details__svg"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 487.912 487.912">
              <title>Pressure</title>
              <path d="M203.206 304.912c2.6 0 5.2-1 7.1-3l20.3-20.6c4 1.9 8.5 3 13.2 3 16.9 0 30.7-13.7 30.7-30.6 0-4.6-1.1-8.9-2.9-12.7 0 0 .1 0 .1-.1l23.5-23.9v6.2c0 5.5 4.5 10 10 10s10-4.5 10-10v-30.5c0-5.5-4.4-10-10-10h-30.7c-5.5 0-10 4.5-10 10s4.5 10 10 10h6.7l-23.7 24.2-.1.1c-4.1-2-8.7-3.1-13.5-3.1-16.9 0-30.7 13.4-30.7 29.8 0 4.9 1.2 9.5 3.2 13.6l-20.3 20.6c-3.9 3.9-3.8 10.3.1 14.1 1.9 1.9 4.5 2.9 7 2.9zm40.7-60.999c5.8 0 10.7 4.5 10.7 9.8 0 6-4.7 10.6-10.7 10.6s-10.7-4.7-10.7-10.6c0-5.3 4.9-9.8 10.7-9.8z" />
              <path d="M292.206 66.213c6.4-19.3.5-41.1-15.8-54.2-18.1-16-46-16-64.9-.1-16.3 13.1-22.3 35-15.9 54.3-95.2 21.8-166.4 106.8-166.4 208.1 0 117.8 96.3 213.6 214.7 213.6s214.8-95.8 214.8-213.6c0-101.301-71.3-186.301-166.5-208.1zm-68.1-38.8c.1-.1.2-.1.2-.2 11.5-9.7 28.3-9.8 39-.2.1.1.3.2.4.4 10.5 8.4 13.8 23 8.4 35.1-9.2-1.2-18.7-1.8-28.2-1.8s-19 .6-28.2 1.8c-5.5-12.1-2.2-26.701 8.4-35.1zm19.8 440.499c-78.3 0-146-46.2-176.9-112.7h353.7c-30.8 66.5-98.5 112.7-176.8 112.7zm-86.4-294.9c50.1-41.3 122.8-41.3 172.9 0 47.7 39.3 60.4 106.7 31.1 162.2h-235.2c-29.2-55.499-16.6-122.9 31.2-162.2zm270.5 162.3h-44.3c12.1-27.4 16.2-57.8 11.3-87.3-5.8-35.5-24.3-67.6-51.9-90.4-57.5-47.3-140.8-47.3-198.3 0-27.6 22.8-46.1 54.9-51.9 90.4-4.9 29.5-.8 59.9 11.3 87.3h-45.2c-6.4-19.2-9.9-39.6-9.9-60.9.1-106.8 87.4-193.7 194.8-193.7s194.8 86.8 194.8 193.6c0 21.3-3.5 41.8-9.9 61h-.8z" />
            </svg>
            <strong>{pressure} hPa</strong>
          </p>
          <p className="result-current__details__par">
            <svg
              className="result-current__details__svg"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 489 489">
              <title>Clouds</title>
              <path d="M367 159c-10.3 0-20.5 1.3-30.2 3.8-8.4-20.8-22.7-39.4-40.9-52.9-21.2-15.7-46.3-24-72.5-24-44.5 0-85.6 25.2-107.1 64.9-8.1-2.4-16.7-3.7-24.7-3.7-50.5 0-91.6 41.2-91.6 91.8s41.1 91.8 91.6 91.8h54c8.9 41.3 45.6 72.4 89.5 72.4H367c67.3 0 122-54.9 122-122.3 0-67.3-54.7-121.8-122-121.8zM143.5 310.2h-52c-39.4.2-71.5-32-71.5-71.6 0-39.6 32.1-71.8 71.6-71.8 8.3 0 17.7 1.9 25.9 5.3 5 2.1 10.7-.2 13-5.1 16.8-37.3 53.4-61.4 93-61.4 41.1 0 78.8 25.7 94.4 63.4-24.7 10.8-45.4 29.6-58.3 54-7.8-2.1-15.9-3.1-24.5-3.1-24.4 0-47.4 9.4-64.7 26.5-17.2 17-26.7 39.6-26.9 63.8zM367 382.8H235.1c-39.5 0-71.6-32.2-71.6-71.8 0-39.1 32.1-71 71.6-71 9.4 0 18 1.5 26.1 4.7 5 1.9 10.6-.4 12.8-5.4 15.9-36.7 52.4-60.4 93-60.4 56.3 0 102 45.6 102 101.6 0 56.4-45.8 102.3-102 102.3z" />
            </svg>
            <strong>{clouds}%</strong>
          </p>
          <p className="result-current__details__par">
            <svg
              className="result-current__details__svg"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 510 510">
              <title>Visibility</title>
              <path d="M506.597 245.486C460.244 189.012 362.107 123.107 255 123.107c-107.491 0-205.632 66.353-251.597 122.379a15 15 0 000 19.028c47.452 57.84 145.819 122.38 251.597 122.38 109.537 0 207.256-68.357 251.597-122.379a15 15 0 000-19.029zM356.893 255c0 56.184-45.709 101.894-101.894 101.894-56.186 0-101.894-45.713-101.894-101.894 0-56.184 45.709-101.894 101.894-101.894 56.19.001 101.894 45.716 101.894 101.894zm-321.631.004c16.883-17.547 57.591-55.416 114.736-79.721-35.862 47.122-35.876 112.273-.017 159.412-43.449-18.415-83.811-47.509-114.719-79.691zm324.74 79.713c35.862-47.123 35.875-112.273.017-159.412 43.447 18.415 83.81 47.51 114.719 79.69-16.883 17.549-57.591 55.416-114.736 79.722z" />
              <path d="M204 255c0 28.122 22.878 51 51 51 28.121 0 51-22.878 51-51s-22.879-51-51-51c-28.122 0-51 22.878-51 51zm72 0c0 11.58-9.421 21-21 21-11.58 0-21-9.42-21-21s9.42-21 21-21c11.579 0 21 9.42 21 21zM255 65c8.284 0 15-6.716 15-15V15c0-8.284-6.716-15-15-15s-15 6.716-15 15v35c0 8.284 6.716 15 15 15zM344.5 85.062c7.192 4.102 16.355 1.601 20.461-5.599l19.962-35c4.104-7.196 1.599-16.356-5.598-20.461-7.198-4.104-16.356-1.599-20.461 5.599l-19.962 35c-4.104 7.195-1.598 16.356 5.598 20.461zM145.039 79.463c4.104 7.196 13.264 9.702 20.461 5.598 7.196-4.104 9.702-13.265 5.598-20.461l-19.962-35c-4.104-7.196-13.266-9.702-20.461-5.598-7.196 4.104-9.702 13.265-5.598 20.461zM255 445c-8.284 0-15 6.716-15 15v35c0 8.284 6.716 15 15 15s15-6.716 15-15v-35c0-8.284-6.716-15-15-15zM165.5 424.939c-7.196-4.103-16.356-1.598-20.461 5.598l-19.962 35c-4.104 7.196-1.598 16.357 5.598 20.461 7.197 4.104 16.357 1.597 20.461-5.598l19.962-35c4.105-7.196 1.598-16.357-5.598-20.461zM364.961 430.537c-4.104-7.197-13.267-9.701-20.461-5.599-7.196 4.104-9.702 13.265-5.598 20.461l19.962 35c4.103 7.196 13.263 9.703 20.461 5.599 7.196-4.104 9.702-13.265 5.598-20.461z" />
            </svg>
            <strong>{(visibility / 1000).toFixed(1)} km</strong>
          </p>
          <p className="result-current__details__par">
            <svg
              className="result-current__details__svg"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 487.91 487.91">
              <title>Humidity</title>
              <path d="M244.065 53.968l-23.73 35.351C203.432 114.534 119.05 243.293 119.05 302.257c0 68.903 56.082 124.982 125.018 124.982 68.904 0 124.982-56.082 124.982-124.982 0-58.938-84.352-187.723-101.259-212.938zm.378 349.063c-17.806 0-47.236-9.413-67.256-28.47-22.07-21.008-33.925-52.676-33.925-72.305 0-4.77.703-15.971 4.658-27.972 5.65-17.144 15.227-40.157 26.59-62.885 6.414-12.831 14.229-25.414 21.447-38.05 17.35-30.365 36.002-56.963 48.487-77.256 11.396 18.515 29.995 45.924 46.432 74.467 8.084 14.04 16.012 26.176 23.027 40.115 11.482 22.814 21.563 46.268 27.196 62.926 4.389 12.978 4.12 22.98 4.12 28.277 0 19.402-9.45 51.157-31.053 72.15-20.08 19.511-51.688 29.004-69.722 29.004z" />
            </svg>

            <strong>{humidity}%</strong>
          </p>
          <p className="result-current__details__par">
            <svg
              className="result-current__details__svg"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 488 488">
              <title>Sunrise</title>
              <path d="M124.6 420.85c1.8 1.9 4.4 2.9 7 2.9h.1l112.3-.8 112.4.8c2.7 0 5.2-1 7-2.9 1.9-1.9 3-4.4 3-7.1 0-43.8-23.3-84.6-60.9-106.5-38.1-21.7-85-21.7-122.3 0-38 21.6-61.6 62.4-61.6 106.5 0 2.7 1.1 5.2 3 7.1zm68.5-96.3c31.3-18.2 70.5-18.2 102.4 0 28.5 16.6 47.2 46.3 50.4 79.1l-101.9-.7-102 .7c3.2-32.9 22.2-62.6 51.1-79.1zM244 238.95c5.5 0 10-4.5 10-10v-50.8c0-5.5-4.5-10-10-10s-10 4.5-10 10v50.8c0 5.5 4.5 10 10 10zM376.3 290.55c2.6 0 5.1-1 7.1-3l41.3-41.6c3.8-3.9 3.8-10.2-.1-14.1-3.9-3.8-10.2-3.8-14.1.1l-41.3 41.6c-3.8 3.9-3.8 10.2.1 14.1 1.9 1.9 4.5 2.9 7 2.9zM104.6 287.55c2 2 4.5 3 7.1 3 2.6 0 5.1-1 7-2.9 4-3.8 4-10.2.1-14.1l-41.3-41.6c-3.8-4-10.2-4-14.1-.1-4 3.8-4 10.2-.1 14.1zM478 403.75h-50.5c-5.5 0-10 4.5-10 10s4.5 10 10 10H478c5.5 0 10-4.5 10-10s-4.5-10-10-10zM70.5 413.75c0-5.5-4.5-10-10-10H10c-5.5 0-10 4.5-10 10s4.5 10 10 10h50.5c5.5 0 10-4.5 10-10z" />
              <path d="M181.013 142.47l53-53v139.7c0 5.5 4.5 10 10 10s10-4.5 10-10V89.47l53 53c3.9 3.9 10.2 3.9 14.1 0 3.9-3.9 3.9-10.2 0-14.1l-70.1-70.1c-1.9-1.9-4.4-2.9-7.1-2.9-2.7 0-5.2 1.1-7.1 2.9l-70.1 70.1c-3.7 3.9-3.7 10.2.2 14.1 3.9 3.9 10.2 3.9 14.1 0z" />
            </svg>
            <strong>
              {new Date(sunrise).toLocaleTimeString().slice(0, 5)}
            </strong>
          </p>
          <p className="result-current__details__par">
            <svg
              className="result-current__details__svg"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 488 488">
              <title>Sunset</title>
              <path d="M124.6 420.85c1.8 1.9 4.4 2.9 7 2.9h.1l112.3-.8 112.4.8c2.7 0 5.2-1 7-2.9 1.9-1.9 3-4.4 3-7.1 0-43.8-23.3-84.6-60.9-106.5-38.1-21.7-85-21.7-122.3 0-38 21.6-61.6 62.4-61.6 106.5 0 2.7 1.1 5.2 3 7.1zm68.5-96.3c31.3-18.2 70.5-18.2 102.4 0 28.5 16.6 47.2 46.3 50.4 79.1l-101.9-.7-102 .7c3.2-32.9 22.2-62.6 51.1-79.1zM244 238.95c5.5 0 10-4.5 10-10v-50.8c0-5.5-4.5-10-10-10s-10 4.5-10 10v50.8c0 5.5 4.5 10 10 10zM376.3 290.55c2.6 0 5.1-1 7.1-3l41.3-41.6c3.8-3.9 3.8-10.2-.1-14.1-3.9-3.8-10.2-3.8-14.1.1l-41.3 41.6c-3.8 3.9-3.8 10.2.1 14.1 1.9 1.9 4.5 2.9 7 2.9zM104.6 287.55c2 2 4.5 3 7.1 3 2.6 0 5.1-1 7-2.9 4-3.8 4-10.2.1-14.1l-41.3-41.6c-3.8-4-10.2-4-14.1-.1-4 3.8-4 10.2-.1 14.1zM478 403.75h-50.5c-5.5 0-10 4.5-10 10s4.5 10 10 10H478c5.5 0 10-4.5 10-10s-4.5-10-10-10zM70.5 413.75c0-5.5-4.5-10-10-10H10c-5.5 0-10 4.5-10 10s4.5 10 10 10h50.5c5.5 0 10-4.5 10-10z" />
              <path d="M236.95 236.214c1.9 1.9 4.4 2.9 7.1 2.9 2.7 0 5.2-1.1 7.1-2.9l70.1-70.1c3.8-3.8 3.8-10.2-.2-14.1-3.9-3.9-10.2-3.9-14.1 0l-53 53v-139.7c0-5.5-4.5-10-10-10s-10 4.5-10 10v139.7l-53-53c-3.9-3.9-10.2-3.9-14.1 0-3.9 3.9-3.9 10.2 0 14.1z" />
            </svg>
            <strong>{new Date(sunset).toLocaleTimeString().slice(0, 5)}</strong>
          </p>
        </section>
      </article>
    );
  }
};

export default ResultCurrent;
