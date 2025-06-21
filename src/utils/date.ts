export const dateToIndonesianString = (
  date: Date,
  excludeDate?: boolean,
): string => {
  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "long",
    year: "numeric",
  };

  let result = date.toLocaleDateString("id-ID", options);

  if (excludeDate) {
    let components = result.split(" ");
    result = components.slice(1).join(" ");
  }

  return result;
};
