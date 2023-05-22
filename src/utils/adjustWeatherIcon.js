const adjustWeatherIcon = (weatherData) => {
  const iconCode = weatherData?.icon;
  const weatherId = weatherData?.id;

  if (iconCode === "13d" || iconCode === "13n") {
    const sleetIds = [611, 612, 613, 615, 616];

    for (let el of sleetIds) {
      if (el === weatherId) {
        return iconCode === "13d" ? "12d" : "12n";
      }
    }
  }

  return weatherData?.icon;
};

export default adjustWeatherIcon;
