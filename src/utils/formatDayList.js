import formatDayName from "./formatDayName";

const formatDayList = (forecastArray) => {
  const daysArray = forecastArray
    ?.map((item) => formatDayName(item.dt))
    .filter((item, idx, array) => {
      if (idx === 0) {
        return item;
      } else if (idx > 0 && array[idx] !== array[idx - 1]) {
        return item;
      }
      return null;
    });

  return daysArray;
};

export default formatDayList;
