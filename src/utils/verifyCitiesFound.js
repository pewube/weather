import { redirect } from "react-router-dom";

const verifyCitiesFound = (citiesFound, stringNotFound) => {
  // verify the cities found and remove the same ones
  const citiesFoundLength = citiesFound.length;
  if (citiesFoundLength < 1) {
    throw new Response("", {
      status: 299,
      statusText: encodeURIComponent(
        `Nie znaleziono miejscowości o nazwie: ${stringNotFound}`
      ),
    });
  } else if (citiesFoundLength === 1) {
    const cityName =
      citiesFound[0]?.["local_names"]?.["pl"] || citiesFound[0]["name"];

    return redirect(
      `/${encodeURIComponent(cityName)}/${citiesFound[0]["country"]}/${
        citiesFound[0]["lat"]
      }/${citiesFound[0]["lon"]}/now`
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
      const cityName =
        citiesFound[0]?.["local_names"]?.["pl"] || citiesFound[0]["name"];

      return redirect(
        `/${encodeURIComponent(cityName)}/${citiesFound[0]["country"]}/${
          citiesFound[0]["lat"]
        }/${citiesFound[0]["lon"]}/now`
      );
    } else {
      return citiesVerified;
    }
  }
};

export default verifyCitiesFound;
