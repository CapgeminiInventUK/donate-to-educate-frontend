import { SvgProps } from '@/types/props';

const ArrowRight = ({ className, onClick, colour }: SvgProps): JSX.Element => (
  <svg
    aria-label="arrow-right"
    className={className}
    onClick={onClick}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
  >
    <path
      d="M9.60039 7.19922L14.4004 11.9992L9.60039 16.7992"
      stroke={colour}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default ArrowRight;
