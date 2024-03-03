export const convertMetersToMiles = (meters: number | string, decimalPlaces = 1): string => {
  return (Number(meters) / 1609.344).toFixed(decimalPlaces);
};

export const convertMilesToMeters = (miles: number | string, decimalPlaces = 0): string => {
  return (Number(miles) * 1609.344).toFixed(decimalPlaces);
};
