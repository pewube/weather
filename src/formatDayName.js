const formatDayName = (secondsDate) => {
  const dateNumber = new Date(secondsDate * 1000).getDay();

  switch (dateNumber) {
    case 0:
      return "Niedziela";
    case 1:
      return "Poniedziałek";
    case 2:
      return "Wtorek";
    case 3:
      return "Środa";
    case 4:
      return "Czwartek";
    case 5:
      return "Piątek";
    case 6:
      return "Sobota";
    default:
  }
  return "Co za dzień ?";
};

export default formatDayName;
