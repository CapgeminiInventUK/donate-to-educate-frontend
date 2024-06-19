export const convertMetresToMiles = (metres: number | string, decimalPlaces = 1): string => {
  return (Number(metres) / 1609.344).toFixed(decimalPlaces);
};

export const convertMilesToMetres = (miles: number | string, decimalPlaces = 0): string => {
  return (Number(miles) * 1609.344).toFixed(decimalPlaces);
};
