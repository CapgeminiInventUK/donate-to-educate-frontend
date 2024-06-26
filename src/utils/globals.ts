export const breakpoints = {
  screenSmall: '400px',
  screenMedium: '768px',
  screenLarge: '1024px',
  screenXLarge: '1200px',
};

export const TEN_SECONDS_IN_MILLISECONDS = 10000;

export const scrollToTheTop = (): void => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
};

// Regex to check inputted phone number contains only digits, spaces or a "+" at the beginning
export const phoneNumberRegex = /^[+]?[0-9\s]+$/;

export const SEARCH_RADIUS_IN_MILES = 7.5;
export const SEARCH_RESULT_LIMIT = 100;
export const SEARCH_DEFAULT_ZOOM_LEVEL = 13;

export const capitalizeFirstLetter = (string: string): string =>
  string.charAt(0).toUpperCase() + string.slice(1);
