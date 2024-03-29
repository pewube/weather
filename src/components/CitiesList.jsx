import { useContext } from "react";
import { NavLink } from "react-router-dom";

import { AppContext } from "../context/AppContext";
import formatCityDetails from "../utils/formatCityDetails";
import MapLocation from "./MapLocation";

import { ReactComponent as BtnClose } from "../assets/images/icons/btn/btn-close.svg";
import { ReactComponent as BtnMap } from "../assets/images/icons/btn/btn-map.svg";

const CitiesList = ({ data, handleRemove = null }) => {
  const { setModal } = useContext(AppContext);

  const cities = formatCityDetails(data);

  const handleMapBtn = (city) => {
    // creating data for markers on the map
    let markerData = [];
    for (let el of data) {
      // marker of clicked city's must be first in the array due to icon color settings (MapLocation.jsx)
      if (el.lat === city.lat && el.lon === city.lon) {
        markerData.unshift({
          name: el?.local_names?.pl || el.name,
          country: el.country,
          lat: el?.lat,
          lon: el?.lon,
        });
      } else {
        markerData.push({
          name: el?.local_names?.pl || el.name,
          country: el.country,
          lat: el?.lat,
          lon: el?.lon,
        });
      }
    }

    const modalBody = (
      <MapLocation
        data={city}
        markerData={markerData}
        zoom={6}
        minimap={true}
        popup={true}
      />
    );
    const modalHeader = (
      <h2 className="modal__header__title">
        {city?.local_names?.pl || city.name}
      </h2>
    );

    setModal({ visible: true, header: modalHeader, body: modalBody });
  };

  const citiesList = cities?.map((city, idx) => (
    <li key={city?.id || idx} className="cities-list__item city">
      {handleRemove && city?.id && (
        <button
          onClick={() => handleRemove(city?.id)}
          className="city__btn city__btn--remove btn-clear">
          <BtnClose className="material-symbols-outlined" />
        </button>
      )}
      <NavLink
        to={`/${encodeURIComponent(city?.local_names?.pl || city.name)}/${
          city.country
        }/${city.lat}/${city.lon}/now`}
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
        className="city__btn city__btn--map btn-clear"
        onClick={() => handleMapBtn(city)}
        type="button"
        aria-label="Show modal with locations of all listed localities on the map. The map will be centered on the selected locality.">
        <BtnMap className="material-symbols-outlined" />
      </button>
    </li>
  ));

  return <ul className="cities-list">{citiesList}</ul>;
};

export default CitiesList;
