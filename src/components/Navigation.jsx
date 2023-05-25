import { NavLink, useParams } from "react-router-dom";

const Navigation = () => {
  const params = useParams();
  return (
    <ul className="nav__list">
      <li className="nav__item">
        <NavLink
          to={`/${encodeURIComponent(params.city)}/${params.country}/${
            params.lat
          }/${params.lon}/now`}
          className="nav__item__link btn-primary">
          Teraz
        </NavLink>
      </li>
      <li className="nav__item">
        <NavLink
          to={`/${encodeURIComponent(params.city)}/${params.country}/${
            params.lat
          }/${params.lon}/8-days`}
          className="nav__item__link btn-primary">
          8 dni
        </NavLink>
      </li>
      <li className="nav__item">
        <NavLink
          to={`/${encodeURIComponent(params.city)}/${params.country}/${
            params.lat
          }/${params.lon}/48-hours`}
          className="nav__item__link btn-primary">
          48 godz.
        </NavLink>
      </li>
    </ul>
  );
};

export default Navigation;
