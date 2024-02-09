import { SvgProps } from '@/types/props';

const SearchIcon = ({ className }: SvgProps): JSX.Element => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    width="29"
    height="28"
    viewBox="0 0 29 28"
    fill="none"
  >
    <path
      d="M21.5384 21.2L26.5 26M24.9 13.2C24.9 19.3856 19.8856 24.4 13.7 24.4C7.51441 24.4 2.5 19.3856 2.5 13.2C2.5 7.01441 7.51441 2 13.7 2C19.8856 2 24.9 7.01441 24.9 13.2Z"
      stroke="#FEFCFD"
      strokeWidth="4"
      strokeLinecap="round"
    />
  </svg>
);

export default SearchIcon;
