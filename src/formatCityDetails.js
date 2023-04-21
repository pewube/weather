const formatCityDetails = (citiesList) => {
  const cities = [...citiesList];

  for (const city of cities) {
    if (city.state) {
      city["state"] = city["state"]
        .replace(" Voivodeship", "")
        .replace("Masovian", "Mazowieckie")
        .replace("Łódź", "Łódzkie")
        .replace("Subcarpathian", "Podkarpackie")
        .replace("Warmian-Masurian", "Warmińsko-Mazurskie")
        .replace("West Pomeranian", "Zachodniopomorskie");
    }
  }

  return cities;
};

export default formatCityDetails;
