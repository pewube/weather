import { NavLink, useParams } from "react-router-dom";

const Navigation = () => {
  const params = useParams();
  return (
    <ul>
      <li className="nav__item">
        <NavLink
          to={`/current/${params.lat}/${params.lon}`}
          className="nav__item__link">
          Teraz
        </NavLink>
      </li>
      <li className="nav__item">
        <NavLink
          to={`/48-hours/${params.lat}/${params.lon}`}
          className="nav__item__link">
          48 godzin
        </NavLink>
      </li>
      <li className="nav__item">
        <NavLink
          to={`/8-days/${params.lat}/${params.lon}`}
          className="nav__item__link">
          8 dni
        </NavLink>
      </li>
    </ul>
  );
};

export default Navigation;
