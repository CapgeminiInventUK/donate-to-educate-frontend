import { SvgProps } from '@/types/props';

const ChevronLeft = ({ className }: SvgProps): JSX.Element => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
  >
    <path
      d="M14.3996 16.7998L9.59961 11.9998L14.3996 7.19981"
      stroke="#FEFCFD"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default ChevronLeft;
