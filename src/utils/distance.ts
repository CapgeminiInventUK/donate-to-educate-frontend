export const convertMetersToMiles = (meters: number | string, decimalPlaces = 1): string => {
  return (Number(meters) / 1609.344).toFixed(decimalPlaces);
};
