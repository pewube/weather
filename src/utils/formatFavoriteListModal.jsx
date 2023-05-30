import CitiesList from "../components/CitiesList";

const formatFavoriteListModal = (favoriteLocations, handleRemove) => {
  const body =
    favoriteLocations.length > 0 ? (
      <ul className="header__favorites">
        <CitiesList data={favoriteLocations} handleRemove={handleRemove} />
      </ul>
    ) : (
      <p>Lista jest pusta</p>
    );
  const header = <h2 className="modal__header__title">Ulubione lokalizacje</h2>;

  return { body, header };
};

export default formatFavoriteListModal;
