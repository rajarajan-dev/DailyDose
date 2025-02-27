// Parse the date strings into a valid format for the Date constructor
const parseDate = (dateString: string): Date => {
  const [day, month, year] = dateString.split("/");
  return new Date(`${year}-${month}-${day}`);
};

export default parseDate;
