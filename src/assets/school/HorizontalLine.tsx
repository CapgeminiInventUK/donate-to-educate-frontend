import { SvgProps } from '@/types/props';

const HorizontalLine = ({ className }: SvgProps): JSX.Element => {
  return (
    <svg
      className={className}
      height="auto"
      viewBox="0 0 712 3"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M710.5 2.5C711.052 2.5 711.5 2.05228 711.5 1.5C711.5 0.947715 711.052 0.5 710.5 0.5V2.5ZM0.5 2.5H710.5V0.5H0.5V2.5Z"
        fill="#E5E6EB"
      />
    </svg>
  );
};

export default HorizontalLine;
