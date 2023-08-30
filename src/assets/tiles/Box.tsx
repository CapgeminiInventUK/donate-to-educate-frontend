import { SvgProps } from '@/types/props';

const Box = ({ className }: SvgProps): JSX.Element => (
  <svg
    width="26"
    height="26"
    viewBox="0 0 26 26"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M1 7H25M1 7V22C1 23.6569 2.34315 25 4 25H22C23.6569 25 25 23.6569 25 22V7M1 7L7 1H19L25 7M7 13H13"
      stroke="#FEFCFD"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default Box;
