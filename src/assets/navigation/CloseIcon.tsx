import type { SvgProps } from '@/types/props';

const CloseIcon = ({ className, onClick }: SvgProps): JSX.Element => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={30}
    height={24}
    fill="none"
    className={className}
    onClick={onClick}
  >
    <path stroke="#FEFCFD" strokeLinecap="round" strokeWidth={2} d="M29 4 19 14m10 0L19 4" />
  </svg>
);

export default CloseIcon;
