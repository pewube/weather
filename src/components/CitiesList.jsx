import { useContext, useEffect } from "react";
import { NavLink } from "react-router-dom";

import { AppContext } from "../context/AppContext";
import MapLocation from "./MapLocation";

import formatCityDetails from "../utils/formatCityDetails";

const CitiesList = ({ data }) => {
  const { setAppBackground, setModal } = useContext(AppContext);

  useEffect(() => {
    setAppBackground("home");
  }, [setAppBackground]);

  const cities = formatCityDetails(data);

  const handleMapBtn = (city) => {
    // creating data for markers on the map
    let markerData = [];
    for (let el of data) {
      // marker of clicked city's must be first in the array due to icon color settings (MapLocation.jsx)
      if (el.lat === city.lat && el.lon === city.lon) {
        markerData.unshift({
          name: el?.local_names?.pl || el.name,
          lat: el?.lat,
          lon: el?.lon,
        });
      } else {
        markerData.push({
          name: el?.local_names?.pl || el.name,
          lat: el?.lat,
          lon: el?.lon,
        });
      }
    }
    const modalHeader = (
      <h2 className="modal__header__title">
        {city?.local_names?.pl || city.name}
      </h2>
    );
    const modalBody = (
      <MapLocation
        data={city}
        markerData={markerData}
        zoom={6}
        minimap={true}
        popup={true}
      />
    );

    setModal({ visible: true, header: modalHeader, body: modalBody });
  };

  const citiesList = cities?.map((city, index) => (
    <li key={index} className="cities-list__item city">
      <NavLink
        to={`/${encodeURIComponent(city?.local_names?.pl || city.name)}/${
          city.lat
        }/${city.lon}/now`}
        className="city__link">
        <div className="city__name">
          <p className="city__name__name">
            {city?.local_names?.pl || city.name}
          </p>
          {city.state && (
            <p className="city__name__state">{city.state || null}</p>
          )}
        </div>
        <div className="city__country">
          {city.country || null}
          <span
            className={`city__country__flag fi fi-${city.country.toLowerCase()}`}
            role="img"></span>
        </div>
      </NavLink>
      <div className="divider-vertical"></div>
      <button
        className="city__btn btn-clear"
        onClick={() => handleMapBtn(city)}
        type="button"
        aria-label="Show modal with locations of all listed localities on the map. The map will be centered on the selected locality.">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="material-symbols-outlined"
          viewBox="0 96 960 960"
          width="24">
          <path d="m600 914.46-240-84-172.153 66.615q-17.692 6.846-32.769-3.923-15.077-10.769-15.077-29.461V339.078q0-11.846 6.347-21.269 6.346-9.423 17.807-13.654L360 237.54l240 84 172.153-66.615q17.692-6.846 32.769 3.346 15.077 10.192 15.077 28.5v527.69q0 12.23-6.923 21.461-6.924 9.231-18.77 13.462L600 914.46Zm-29.999-73.383v-468l-180.002-62.923v468l180.002 62.923Zm59.998 0L760 798V324l-130.001 49.077v468ZM200 828l130.001-49.846v-468L200 354v474Zm429.999-454.923v468-468Zm-299.998-62.923v468-468Z" />
        </svg>
      </button>
    </li>
  ));

  return (
    <>
      <header className="cities-list__header">
        <p>Wybierz właściwą lokalizację z listy:</p>
      </header>
      <ul className="cities-list">{citiesList}</ul>
    </>
  );
};

export default CitiesList;
