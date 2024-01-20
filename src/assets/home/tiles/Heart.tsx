import { SvgProps } from '@/types/props';

const Heart = ({ className }: SvgProps): JSX.Element => {
  return (
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
        d="M24.9454 38.2611L13.1168 27.5468C6.68823 21.1182 16.1382 8.77537 24.9454 18.7611C33.7525 8.77537 43.1597 21.1611 36.7739 27.5468L24.9454 38.2611Z"
        stroke="#FEFCFD"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default Heart;
