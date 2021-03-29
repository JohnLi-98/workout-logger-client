const ordinal = (date) => {
  if (date > 3 && date < 21) return "th";
  switch (date % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
};

export const convertToDateTime = (timestamp) => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = months[date.getMonth()];
  const monthDate = date.getDate();
  const day = days[date.getDay()];
  const hour = "0" + date.getHours();
  const min = "0" + date.getMinutes();
  const formattedDate = `${day}, ${
    monthDate + ordinal(monthDate)
  } ${month} ${year} - ${hour.substr(-2)}:${min.substr(-2)}`;
  return formattedDate;
};
