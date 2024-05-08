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
