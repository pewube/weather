import { useContext, useEffect } from "react";
import { NavLink } from "react-router-dom";

import { AppContext } from "../context/AppContext";
import MapLocation from "./MapLocation";

import formatCityDetails from "../utils/formatCityDetails";

import { ReactComponent as BtnMap } from "../assets/images/icons/btn/btn-map.svg";

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

  const citiesList = cities?.map((city, idx) => (
    <li key={idx} className="cities-list__item city">
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
        <BtnMap className="material-symbols-outlined" />
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
