import { apiKey } from "./config";

import verifyCitiesFound from "./verifyCitiesFound";

const fetchVerifiedCities = async (params) => {
  const apiGeocoding = `http://api.openweathermap.org/geo/1.0/direct?q=${params.city}&limit=5&appid=${apiKey}&units=metric&lang=pl`;

  const citiesFound = await fetch(apiGeocoding)
    .then((response) => {
      if (response.ok) {
        return response;
      }
      throw Error("apiGeocoding error", { cause: response.status });
    })
    .then((response) => response.json())
    .then((data) => {
      return data;
    })
    .catch((err) => {
      throw new Response("", {
        status: Number(err?.cause),
        statusText: encodeURIComponent(
          "Błąd pobierania danych dotyczących wyszukiwanej nazwy."
        ),
      });
    });

  console.log("fetchMatchedCities ", citiesFound);

  const citiesVerified = verifyCitiesFound(citiesFound);

  return citiesVerified;
};

export default fetchVerifiedCities;
