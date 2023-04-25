import { redirect, useLoaderData } from "react-router-dom";
import { apiKey } from "../config";
import CitiesList from "../components/CitiesList";

export async function loader({ params }) {
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
      console.log("apiGeocoding ", data);
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

  // verify the cities found and remove the same ones
  const citiesFoundLength = citiesFound.length;
  if (citiesFoundLength < 1) {
    throw new Response("", {
      status: 299,
      statusText: encodeURIComponent(
        "Nie znaleziono miejscowości o podanej nazwie."
      ),
    });
  } else if (citiesFoundLength === 1) {
    return redirect(
      `/${encodeURIComponent(citiesFound[0]["name"])}/${
        citiesFound[0]["lat"]
      }/${citiesFound[0]["lon"]}/current`
    );
  } else {
    let citiesVerified = [];
    citiesVerified.push(citiesFound[0]);

    // check if coordinates of the found cities aren't the same than the first one in the list (to the first decimal place), if so, skip them
    for (let i = 1; i < citiesFound.length; i++) {
      if (
        Math.trunc(citiesFound[0]["lat"] * 10) !==
        Math.trunc(citiesFound[i]["lat"] * 10)
      ) {
        citiesVerified.push(citiesFound[i]);
      } else if (
        Math.trunc(citiesFound[0]["lon"] * 10) !==
        Math.trunc(citiesFound[i]["lon"] * 10)
      ) {
        citiesVerified.push(citiesFound[i]);
      }
    }

    // take actions according to the length of the limited list of cities
    if (citiesVerified.length === 1) {
      return redirect(
        `/${encodeURIComponent(citiesFound[0]["name"])}/${
          citiesFound[0]["lat"]
        }/${citiesFound[0]["lon"]}/current`
      );
    } else {
      return citiesVerified;
    }
  }
}

const CitiesFound = () => {
  const citiesVerified = useLoaderData();

  return <CitiesList data={citiesVerified} />;
};

export default CitiesFound;
