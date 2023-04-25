import { useContext, useEffect } from "react";
import { NavLink } from "react-router-dom";

import { AppContext } from "../context/AppContext";
import MapLocation from "./MapLocation";

import formatCityDetails from "../formatCityDetails";

const CitiesList = ({ data }) => {
  const { setAppBackground, setModal } = useContext(AppContext);

  useEffect(() => {
    setAppBackground("home");
  }, [setAppBackground]);

  const cities = formatCityDetails(data);

  const handleMapBtn = (city) => {
    const modalHeader = (
      <h2 className="modal__header__title">
        {city.local_names?.pl || city.name}
      </h2>
    );
    const modalBody = <MapLocation data={city} minimap={true} popup={true} />;

    setModal({ visible: true, header: modalHeader, body: modalBody });
  };

  const citiesList = cities?.map((city, index) => (
    <li key={index} className="cities-list__item city">
      <NavLink
        to={`/${encodeURIComponent(city.name)}/${city.lat}/${city.lon}/now`}
        className="city__link">
        <div className="city__name">
          <p>{city.local_names?.pl || city.name}</p>
          {city.state && <p>{city.state || null}</p>}
        </div>
        <div className="city__country">
          {city.country || null}
          <span
            className={`city__country__flag fi fi-${city.country.toLowerCase()}`}></span>
        </div>
      </NavLink>
      <div className="divider-vertical"></div>
      <button
        className="city__btn btn-clear"
        onClick={() => handleMapBtn(city)}>
        <span className="material-symbols-outlined">map</span>
      </button>
    </li>
  ));

  return (
    <>
      <header className="cities-list__header">
        <p>Wybierz właściwą lokalizację z poniższej listy:</p>
      </header>
      <ul className="cities-list">{citiesList}</ul>
    </>
  );
};

export default CitiesList;
