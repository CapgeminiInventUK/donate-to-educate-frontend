export const convertMetresToMiles = (metres: number | string, decimalPlaces = 1): number => {
  return Number((Number(metres) / 1609.344).toFixed(decimalPlaces));
};

export const convertMilesToMetres = (miles: number | string, decimalPlaces = 0): number => {
  return Number((Number(miles) * 1609.344).toFixed(decimalPlaces));
};
