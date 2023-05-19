import { apiKey } from "../settings/config";

import verifyCitiesFound from "../utils/verifyCitiesFound";

const fetchVerifiedCities = async (params) => {
  const apiGeocoding = `https://api.openweathermap.org/geo/1.0/direct?q=${params.city}&limit=5&appid=${apiKey}&units=metric&lang=pl`;

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

  const citiesVerified = verifyCitiesFound(citiesFound, params.city);

  return citiesVerified;
};

export default fetchVerifiedCities;
