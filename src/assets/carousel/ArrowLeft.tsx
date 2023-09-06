import { SvgProps } from '@/types/props';

const ArrowLeft = ({ className, onClick, colour }: SvgProps): JSX.Element => (
  <svg
    className={className}
    onClick={onClick}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
  >
    <path
      d="M14.3996 16.8008L9.59961 12.0008L14.3996 7.20078"
      stroke={colour}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default ArrowLeft;
