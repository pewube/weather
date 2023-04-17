import { NavLink } from "react-router-dom";

const CitiesList = ({ cities }) => {
  const formatCities = (citiesList) => {
    for (const city of citiesList) {
      if (city.state) {
        city["state"] = city["state"]
          .replace(" Voivodeship", "")
          .replace("Masovian", "Mazowieckie")
          .replace("Łódź", "Łódzkie");
      }
    }
  };

  formatCities(cities);

  const citiesList = cities?.map((city, index) => (
    <li key={index} className="cities-list__item city">
      <NavLink to={`/current/${city.lat}/${city.lon}`} className="city__link">
        <span className="city__name">{city.local_names?.pl || city.name}</span>
        <span className="city__country">{city.country || null}</span>
        <span className="city__country-flag">flaga</span>
        <span className="city__state">{city.state || null}</span>
      </NavLink>
      <NavLink
        to={`https://www.openstreetmap.org/?mlat=${city.lat}&mlon=${
          city.lon
        }#map=14/${city.lat.toFixed(4)}/${city.lon.toFixed(4)}`}
        className="city__link city__coordinates"
        target="_blank"
        rel="noopener">
        {city.lat && city.lon
          ? city.lat.toFixed(4) + ", " + city.lon.toFixed(4)
          : null}
      </NavLink>
    </li>
  ));

  return (
    <>
      <header>
        Znaleziono więcej niż jedno miasto. Wybierz właściwe z poniższej listy:
      </header>
      <ul className="cities-list">{citiesList}</ul>
    </>
  );
};

export default CitiesList;
