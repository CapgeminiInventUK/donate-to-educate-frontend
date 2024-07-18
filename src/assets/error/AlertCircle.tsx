import type { SvgProps } from '@/types/props';

const AlertCircle = ({ className }: SvgProps): JSX.Element => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    width="76"
    height="75"
    viewBox="0 0 76 75"
    fill="none"
  >
    <path
      d="M38 37.5V22.5M38 48.6182V48.75M68 37.5C68 54.0685 54.5685 67.5 38 67.5C21.4315 67.5 8 54.0685 8 37.5C8 20.9315 21.4315 7.5 38 7.5C54.5685 7.5 68 20.9315 68 37.5Z"
      stroke="#FEFCFD"
      strokeWidth="5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default AlertCircle;
