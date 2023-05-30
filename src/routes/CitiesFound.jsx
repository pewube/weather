import { useContext, useEffect } from "react";
import { useLoaderData } from "react-router-dom";

import { AppContext } from "../context/AppContext";
import CitiesList from "../components/CitiesList";
import fetchVerifiedCities from "../data/fetchVerifiedCities";

export async function loader({ params }) {
  return await fetchVerifiedCities(params);
}

const CitiesFound = () => {
  const { setAppBackground } = useContext(AppContext);
  const citiesVerified = useLoaderData();

  useEffect(() => {
    setAppBackground("home");
  }, [setAppBackground]);

  return (
    <>
      <header className="cities-found__header">
        <p>Wybierz właściwą lokalizację z listy:</p>
      </header>
      <CitiesList data={citiesVerified} />
    </>
  );
};

export default CitiesFound;
