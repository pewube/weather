const formatDayName = (secondsDate) => {
  const dayNumber = new Date(secondsDate * 1000).getDay();
  const dayDate = new Date(secondsDate * 1000).toLocaleDateString("pl", {
    day: "2-digit",
    month: "2-digit",
  });

  switch (dayNumber) {
    case 0:
      return `${dayDate} Niedziela`;
    case 1:
      return `${dayDate} Poniedziałek`;
    case 2:
      return `${dayDate} Wtorek`;
    case 3:
      return `${dayDate} Środa`;
    case 4:
      return `${dayDate} Czwartek`;
    case 5:
      return `${dayDate} Piątek`;
    case 6:
      return `${dayDate} Sobota`;
    default:
  }
  return `${dayDate}`;
};

export default formatDayName;
