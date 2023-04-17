import { apiKey } from "./config";

export async function fetchCities(cityName) {
  const apiGeocoding = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=5&appid=${apiKey}&units=metric&lang=pl`;

  await fetch(apiGeocoding)
    .then((response) => {
      if (response.ok) {
        return response;
      }
      throw Error(`Błąd połączenia z serwerem. Kod: ${response.status}`);
    })
    .then((response) => response.json())
    .then((data) => {
      return data;
    })
    .catch((err) => {
      return err;
    });
}

export const fetchCurrent = (lat, lon) => {
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
      console.log("fetchCurrent data: ", data);
      return data;
    })
    .catch((err) => {
      console.log("fetchCities error: ", err);
      return err;
    });
};

export const fetchForecast = (lat, lon) => {
  const apiForecast = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&%20exclude=hourly&appid=${apiKey}&units=metric&lang=pl`;

  fetch(apiForecast)
    .then((response) => {
      if (response.ok) {
        return response;
      }
      throw Error("apiForecast error");
    })
    .then((response) => response.json())
    .then((data) => {
      console.log("fetchForecast data: ", data);
      return data;
    })
    .catch((err) => {
      console.log("fetchForecast error: ", err);
      return err;
    });
};

/*
const handleFoundCities = (data) => {
  const dataLength = data.length;

  if (dataLength === 1) {
    setMatchedCities(data);
    // go to path="/current/:lat/:lon"
  } else if (dataLength > 1) {
    let limitedList = [];
    limitedList.push(data[0]);

    // 1. check if the found cities have the same coordinates than the first one in the list (to the first decimal place), if so, skip them
    for (let i = 1; i < data.length; i++) {
      if (Math.trunc(data[0]["lat"] * 10) !== Math.trunc(data[i]["lat"] * 10)) {
        limitedList.push(data[i]);
      } else if (
        Math.trunc(data[0]["lon"] * 10) !== Math.trunc(data[i]["lon"] * 10)
      ) {
        limitedList.push(data[i]);
      }
    }
    console.log("limitedList: ", limitedList);
    setMatchedCities(limitedList);

    // 2. take actions according to the length of the limited list of cities
    if (limitedList.length === 1) {
      // go to path="/current/:lat/:lon"
    } else {
      // go to path="/city/:city"
    }
  }
};
*/
