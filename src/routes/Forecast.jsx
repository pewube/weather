import { useContext, useEffect, useRef, useState } from "react";
import { Outlet, useLoaderData, useParams } from "react-router-dom";

import { AppContext } from "../context/AppContext";
import fetchWeatherData from "../data/fetchWeatherData";
import MapLocation from "../components/MapLocation";

import { ReactComponent as BtnMap } from "../assets/images/icons/btn/btn-map.svg";

export async function loader({ params }) {
  return await fetchWeatherData(params);
}

const Forecast = () => {
  const data = useLoaderData();
  const [hiddenMap, setHiddenMap] = useState(true);
  const [hiddenMapStyle, setHiddenMapStyle] = useState(true);
  const mapData = { lat: data.forecast.lat, lon: data.forecast.lon };
  const mapRef = useRef();
  const params = useParams();
  const { setAppBackground, setModal, setWeatherData } = useContext(AppContext);

  const handleMapBtn = () => {
    setHiddenMapStyle((hiddenMapStyle) => !hiddenMapStyle);
    if (!hiddenMap) {
      setTimeout(() => {
        setHiddenMap((hiddenMap) => !hiddenMap);
      }, 200);
    } else setHiddenMap((hiddenMap) => !hiddenMap);
  };

  useEffect(() => {
    setModal({ visible: false, header: {}, body: {} });
    setWeatherData(data);
    setAppBackground(data.current.weather[0].icon);
    setHiddenMapStyle(true);
    setHiddenMap(true);
  }, [data, setAppBackground, setModal, setWeatherData]);

  return (
    <>
      <header className="forecast__header">
        <h1 className="forecast__header__title">
          {decodeURIComponent(params.city)}
          <span className="forecast__header__title__country">
            , {data.current.sys.country}
          </span>
        </h1>
        <button
          className="btn-clear"
          onClick={handleMapBtn}
          type="button"
          aria-expanded={hiddenMap ? false : true}
          aria-controls="collapse-map"
          aria-label="Show location of town on map">
          <BtnMap className="material-symbols-outlined" />
        </button>
      </header>
      <section
        id="collapse-map"
        className="forecast__map"
        ref={mapRef}
        style={hiddenMapStyle ? null : { height: 240 }}>
        {!hiddenMap && (
          <MapLocation data={mapData} popup={false} dragging={false} />
        )}
      </section>
      <Outlet />
    </>
  );
};

export default Forecast;
