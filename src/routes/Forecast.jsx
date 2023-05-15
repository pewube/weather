import { useContext, useEffect, useRef, useState } from "react";
import { Outlet, useLoaderData, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import MapLocation from "../components/MapLocation";

import fetchWeatherData from "../data/fetchWeatherData";

export async function loader({ params }) {
  return await fetchWeatherData(params);
}

const Forecast = () => {
  const data = useLoaderData();
  const params = useParams();
  const { setAppBackground, setModal, setWeatherData } = useContext(AppContext);
  const [hiddenMap, setHiddenMap] = useState(true);
  const mapRef = useRef();

  const mapData = { lat: data.forecast.lat, lon: data.forecast.lon };

  const handleMapBtn = () => setHiddenMap((hiddenMap) => !hiddenMap);

  useEffect(() => {
    setModal({ visible: false, header: {}, body: {} });
    setWeatherData(data);
    setAppBackground(data.current.weather[0].icon);
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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="material-symbols-outlined"
            viewBox="0 96 960 960"
            width="24">
            <path d="m600 914.46-240-84-172.153 66.615q-17.692 6.846-32.769-3.923-15.077-10.769-15.077-29.461V339.078q0-11.846 6.347-21.269 6.346-9.423 17.807-13.654L360 237.54l240 84 172.153-66.615q17.692-6.846 32.769 3.346 15.077 10.192 15.077 28.5v527.69q0 12.23-6.923 21.461-6.924 9.231-18.77 13.462L600 914.46Zm-29.999-73.383v-468l-180.002-62.923v468l180.002 62.923Zm59.998 0L760 798V324l-130.001 49.077v468ZM200 828l130.001-49.846v-468L200 354v474Zm429.999-454.923v468-468Zm-299.998-62.923v468-468Z" />
          </svg>
        </button>
      </header>
      <section
        id="collapse-map"
        className="forecast__map"
        ref={mapRef}
        style={hiddenMap ? null : { height: 240 }}>
        {!hiddenMap && (
          <MapLocation data={mapData} popup={false} dragging={false} />
        )}
      </section>
      <Outlet />
    </>
  );
};

export default Forecast;
