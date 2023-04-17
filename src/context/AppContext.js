import React, { createContext, useState } from "react";
import { apiKey } from "../config";

export const AppContext = createContext();

const AppProvider = (props) => {
  const [appBackground, setAppBackground] = useState("home");
  const [inputError, setInputError] = useState({ is: false, info: "" });
  const [matchedCities, setMatchedCities] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentWeather, setCurrentWeather] = useState({});
  const [weatherForecast, setWeatherForecast] = useState({});

  /*
  const fetchCities = (cityName) => {
    const apiGeocoding = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=5&appid=${apiKey}&units=metric&lang=pl`;

    if (cityName.length > 1) {
      fetch(apiGeocoding)
        .then((response) => {
          if (response.ok) {
            return response;
          }
          throw Error("apiGeocoding error");
        })
        .then((response) => response.json())
        .then((data) => {
          if (data.length > 0) {
            handleFoundCities(data);
          } else {
            setInputError({
              is: true,
              info: `Nie znaleziono miejscowości o nazwie: ${cityName}.`,
            });
          }
        })
        .catch(() => {
          setInputError({
            is: true,
            info: "Błąd połączenia z serwerem.",
          });
        });
    } else {
      setInputError({
        is: true,
        info: "Nazwa miejscowości musi być dłuższa.",
      });
    }
  };

  const fetchCurrent = (lat, lon) => {
    const apiCurrent = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=pl`;

    fetch(apiCurrent)
      .then((response) => {
        if (response.ok) {
          return response;
        }
        throw Error("apiCurrent error");
      })
      .then((response) => response.json())
      .then((data) => {
        setWeatherCurrent({
          date: data.dt * 1000,
          sunrise: data.sys.sunrise * 1000,
          sunset: data.sys.sunset * 1000,
          city: data.name,
          country: data.sys.country,
          temp: data.main.temp.toFixed(),
          tempFeelsLike: data.main.feels_like.toFixed(),
          description: data.weather[0].description,
          iconWeather: data.weather[0].icon,
          pressure: data.main.pressure,
          windSpeed: data.wind.speed,
          windDeg: data.wind.deg,
          windGust: data.wind.gust,
          humidity: data.main.humidity,
          clouds: data.clouds.all,
          visibility: data.visibility,
          latitude: data.coord.lat,
          longitude: data.coord.lon,
        });
      })
      .catch(() => {
        setInputError({
          is: true,
          info: "Błąd połączenia z serwerem.",
        });
      });
  };

  const fetchForecast = () => {};

  const handleFoundCities = (data) => {
    const dataLength = data.length;

    if (dataLength === 1) {
      setMatchedCities(data);
      fetchCurrent(data[0].lat, data[0].lon);
    } else if (dataLength > 1) {
      let limitedList = [];
      limitedList.push(data[0]);

      // 1. check if the found cities have the same coordinates than the first one in the list (to the first decimal place), if so, skip them
      for (let i = 1; i < data.length; i++) {
        if (
          Math.trunc(data[0]["lat"] * 10) !== Math.trunc(data[i]["lat"] * 10)
        ) {
          limitedList.push(data[i]);
        } else if (
          Math.trunc(data[0]["lon"] * 10) !== Math.trunc(data[i]["lon"] * 10)
        ) {
          limitedList.push(data[i]);
        }
      }

      setMatchedCities(limitedList);

      // 2. take actions according to the length of the limited list of cities
      if (limitedList.length === 1) {
        fetchCurrent(data[0].lat, data[0].lon);
      } else {
        setModalVisible(true);
      }
    }
  };
  */

  return (
    <AppContext.Provider
      value={{
        appBackground,
        // fetchCities,
        // handleFoundCities,
        inputError,
        matchedCities,
        modalVisible,
        setAppBackground,
        setInputError,
        setMatchedCities,
        setModalVisible,
        setCurrentWeather,
        setWeatherForecast,
        currentWeather,
        weatherForecast,
      }}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppProvider;
