import { useLoaderData } from "react-router-dom";

import CitiesList from "../components/CitiesList";
import fetchVerifiedCities from "../data/fetchVerifiedCities";

export async function loader({ params }) {
  return await fetchVerifiedCities(params);
}

const CitiesFound = () => {
  const citiesVerified = useLoaderData();

  return <CitiesList data={citiesVerified} />;
};

export default CitiesFound;
