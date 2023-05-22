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
        .replace("Kuyavian-Pomeranian", "Kujawsko-Pomorskie")
        .replace("Lower Silesian", "Dolnośląskie")
        .replace("Lublin", "Lubelskie")
        .replace("Greater Poland", "Wielkopolskie")
        .replace("Lesser Poland", "Małopolskie")
        .replace("Lubusz", "Lubuskie")
        .replace("Pomeranian", "Pomorskie")
        .replace("Silesian", "Śląskie")
        .replace("Opole", "Opolskie")
        .replace("West Pomorskie", "Zachodniopomorskie")
        .replace("West Pomeranian", "Zachodniopomorskie");
    }
  }

  return cities;
};

export default formatCityDetails;
