import formatDayName from "./formatDayName";

const formatDayList = (forecastArray) => {
  const daysArray = forecastArray
    ?.map((item) => formatDayName(item.dt))
    .filter((item, index, array) => {
      if (index === 0) {
        return item;
      } else if (index > 0 && array[index] !== array[index - 1]) {
        return item;
      }
      return null;
    });

  return daysArray;
};

export default formatDayList;
