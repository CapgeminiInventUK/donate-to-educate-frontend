import { SvgProps } from '@/types/props';

const Calender = ({ className }: SvgProps): JSX.Element => (
  <svg
    width="24"
    height="26"
    viewBox="0 0 24 26"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M2.37142 8.88567H21.5713M4.85304 1V3.05738M18.8285 1V3.05713M18.8285 3.05713H5.11426C2.84202 3.05713 1 4.89915 1 7.1714V20.8857C1 23.158 2.84202 25 5.11426 25H18.8285C21.1007 25 22.9427 23.158 22.9427 20.8857L22.9427 7.1714C22.9427 4.89915 21.1007 3.05713 18.8285 3.05713ZM8.54282 17.1143L10.5999 19.1714L15.3999 14.3714"
      stroke="#FEFCFD"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default Calender;
