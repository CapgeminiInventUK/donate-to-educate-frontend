import type { SvgProps } from '@/types/props';

const Email = ({ className }: SvgProps): JSX.Element => {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="76"
      height="75"
      viewBox="0 0 76 75"
      fill="none"
    >
      <path
        d="M13.625 20.625L35.8655 36.0222C37.1496 36.9113 38.8504 36.9113 40.1345 36.0222L62.375 20.625M15.5 60H60.5C64.6421 60 68 56.6421 68 52.5V22.5C68 18.3579 64.6421 15 60.5 15H15.5C11.3579 15 8 18.3579 8 22.5V52.5C8 56.6421 11.3579 60 15.5 60Z"
        stroke="#FEFCFD"
        strokeWidth="4.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default Email;
