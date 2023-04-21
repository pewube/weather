import { apiKey } from "./config";

const fetchWeatherData = async (params) => {
  const apiCurrent = `https://api.openweathermap.org/data/2.5/weather?lat=${params.lat}&lon=${params.lon}&appid=${apiKey}&units=metric&lang=pl`;

  const apiForecast = `https://api.openweathermap.org/data/2.5/onecall?lat=${params.lat}&lon=${params.lon}&exclude=current,minutely&appid=${apiKey}&units=metric&lang=pl`;

  const currentWeather = await fetch(apiCurrent)
    .then((response) => {
      if (response.ok) {
        return response;
      }
      throw Error("apiCurrent error", { cause: response.status });
    })
    .then((response) => response.json())
    .then((data) => {
      return data;
    })
    .catch((err) => {
      throw new Response("", {
        status: Number(err?.cause),
        statusText: encodeURIComponent(
          "Błąd pobierania aktualnych danych pogodowych."
        ),
      });
    });

  const weatherForecast = await fetch(apiForecast)
    .then((response) => {
      if (response.ok) {
        return response;
      }
      throw Error("apiForecast error", { cause: response.status });
    })
    .then((response) => response.json())
    .then((data) => {
      return data;
    })
    .catch((err) => {
      throw new Response("", {
        status: Number(err?.cause),
        statusText: encodeURIComponent("Błąd pobierania danych pogodowych."),
      });
    });

  const timestamp = Date.now();

  const combinedData = {
    timestamp,
    current: currentWeather,
    forecast: weatherForecast,
  };

  console.log("combined data: ", combinedData);

  return combinedData;
};

export default fetchWeatherData;
