export const truncateText = (text, maxLength) => {
  if (text.length > maxLength) {
    return text.slice(0, maxLength) + "...";
  }
  return text;
};

export function formatDateTime(dateTimeString) {
  const options = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  };

  const formattedDateTime = new Date(dateTimeString).toLocaleString(
    undefined,
    options
  );
  const [datePart, timePart] = formattedDateTime.split(", ");
  const [month, day, year] = datePart.split("/");
  const formattedDate = `${day}-${month}-${year}`;

  return `${formattedDate} | ${timePart}`;
}
