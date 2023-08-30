

const formatDate = (date) => {
  const options = {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "numeric",
    minute: "numeric"
  };

  const formattedDate = new Date(date).toLocaleDateString("en-US", options);
  return formattedDate;
};

const DateConverter = ({ date }) => {
  const formattedDate = formatDate(date);

  return formattedDate;
};

export default DateConverter;