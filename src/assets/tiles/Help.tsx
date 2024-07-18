import type { SvgProps } from '@/types/props';

const Help = ({ className }: SvgProps): JSX.Element => (
  <svg
    width="26"
    height="26"
    viewBox="0 0 26 26"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M1 25L1.00051 20.4995C1.00079 18.0144 3.01542 16 5.50051 16H14.4998M18.25 19.75L19.75 21.25L25 16M19.75 1C21.5703 2.02035 22.75 3.6561 22.75 5.5C22.75 7.3439 21.5703 8.97965 19.75 10M16 5.5C16 7.98528 13.9853 10 11.5 10C9.01472 10 7 7.98528 7 5.5C7 3.01472 9.01472 1 11.5 1C13.9853 1 16 3.01472 16 5.5Z"
      stroke="#FEFCFD"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default Help;
