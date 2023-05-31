import { useContext } from "react";
import { Link, useParams } from "react-router-dom";

import {
  addFavoriteLocation,
  getFavoriteLocations,
  removeFavoriteLocation,
} from "../data/storeFavoriteLocations";
import { AppContext } from "../context/AppContext";
import Form from "../components/Form";
import formatFavoriteListModal from "../utils/formatFavoriteListModal";

import { ReactComponent as BtnAddFavorite } from "../assets/images/icons/btn/btn-favorite_add.svg";
import { ReactComponent as BtnFavorites } from "../assets/images/icons/btn/btn-favorite.svg";

const Header = ({ handleHomeLinkClick }) => {
  const { setModal } = useContext(AppContext);
  const params = useParams();

  let favorites = [];

  const handleAddFavoriteClick = async () => {
    favorites = await getFavoriteLocations();
    if (favorites.length > 0) {
      // check if the location is already on the list
      for (const favorite of favorites) {
        if (
          favorite?.name === params?.city &&
          favorite?.lat === params?.lat &&
          favorite?.lon === params?.lon
        ) {
          setModal({
            visible: true,
            header: <>Ta lokalizacja znajduje sie już na liście ulubionych.</>,
            body: null,
          });
          return;
        }
      }

      addFavoriteLocation(params.city, params.country, params.lat, params.lon);
      setModal({
        visible: true,
        header: <>{params.city} - dodano do listy ulubionych.</>,
        body: null,
      });
    } else {
      addFavoriteLocation(params.city, params.country, params.lat, params.lon);
      setModal({
        visible: true,
        header: <>{params.city} - dodano do listy ulubionych.</>,
        body: null,
      });
    }
  };

  const handleRemoveFavoriteClick = async (favoriteId) => {
    removeFavoriteLocation(favoriteId);

    favorites = await getFavoriteLocations();

    const modalContent = formatFavoriteListModal(
      favorites,
      handleRemoveFavoriteClick
    );

    setModal({
      visible: true,
      header: modalContent.header,
      body: modalContent.body,
    });
  };

  const handleFavoritesClick = async () => {
    favorites = await getFavoriteLocations();

    const modalContent = formatFavoriteListModal(
      favorites,
      handleRemoveFavoriteClick
    );

    setModal({
      visible: true,
      header: modalContent.header,
      body: modalContent.body,
    });
  };

  const favoriteBtns =
    Object.keys(params).length <= 1 ? (
      <div className="header__favorites">
        <button
          className="btn-clear favorite-btn"
          aria-label="Show modal with list of favorite locations">
          <BtnFavorites
            className="material-symbols-outlined"
            onClick={handleFavoritesClick}
          />
        </button>
      </div>
    ) : (
      <div className="header__favorites">
        <button
          className="btn-clear favorite-btn"
          type="button"
          aria-label="Show modal with list of favorite locations">
          <BtnAddFavorite
            className="material-symbols-outlined"
            onClick={handleAddFavoriteClick}
          />
        </button>
        <button
          className="btn-clear favorite-btn"
          type="button"
          aria-label="Add your current city to the list of favorite locations">
          <BtnFavorites
            className="material-symbols-outlined"
            onClick={handleFavoritesClick}
          />
        </button>
      </div>
    );

  return (
    <>
      <Link
        to="/"
        onClick={handleHomeLinkClick}
        className="header__home-link"
        aria-label="Home page">
        <h1 className="header__title">Jaka pogoda ?</h1>
      </Link>
      {window.indexedDB && favoriteBtns}
      <Form />
    </>
  );
};

export default Header;
