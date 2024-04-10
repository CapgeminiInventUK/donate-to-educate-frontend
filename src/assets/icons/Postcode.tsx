import { SvgProps } from '@/types/props';

const Postcode = ({ className }: SvgProps): JSX.Element => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    width="50"
    height="50"
    viewBox="0 0 50 50"
    fill="none"
  >
    <rect width="50" height="50" rx="25" fill="#4A8FE7" />
    <path
      d="M24.9565 39C24.9565 39 35.913 29.2609 35.913 21.9565C35.913 15.9054 31.0076 11 24.9565 11C18.9054 11 14 15.9054 14 21.9565C14 29.2609 24.9565 39 24.9565 39Z"
      stroke="#FEFCFD"
      strokeWidth="2.5"
    />
    <path
      d="M28.457 21.5002C28.457 23.4332 26.89 25.0002 24.957 25.0002C23.024 25.0002 21.457 23.4332 21.457 21.5002C21.457 19.5672 23.024 18.0002 24.957 18.0002C26.89 18.0002 28.457 19.5672 28.457 21.5002Z"
      stroke="#FEFCFD"
      strokeWidth="2.5"
    />
  </svg>
);
export default Postcode;
