import CitiesList from "../components/CitiesList";

const formatFavoriteListModal = (favoriteLocations, handleRemove) => {
  const body = (
    <ul className="header__favorites">
      <CitiesList data={favoriteLocations} handleRemove={handleRemove} />
    </ul>
  );
  const header = <h2 className="modal__header__title">Ulubione lokalizacje</h2>;

  return { body, header };
};

export default formatFavoriteListModal;
