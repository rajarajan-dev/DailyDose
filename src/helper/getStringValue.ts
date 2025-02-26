// Helper function to ensure the value is a string
export const getStringValue = (
  value: string | string[] | undefined
): string => {
  if (Array.isArray(value)) {
    return value[0] || ""; // Use the first element if it's an array
  }
  return value || ""; // Return the value or an empty string if undefined
};
