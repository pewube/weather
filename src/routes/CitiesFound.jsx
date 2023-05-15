import { useLoaderData } from "react-router-dom";

import fetchVerifiedCities from "../data/fetchVerifiedCities";

import CitiesList from "../components/CitiesList";

export async function loader({ params }) {
  return await fetchVerifiedCities(params);
}

const CitiesFound = () => {
  const citiesVerified = useLoaderData();

  return <CitiesList data={citiesVerified} />;
};

export default CitiesFound;
