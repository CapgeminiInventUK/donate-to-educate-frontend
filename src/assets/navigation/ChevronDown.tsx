import { SvgProps } from '@/types/props';

const ChevronDown = ({ className, colour }: SvgProps): JSX.Element => {
  if (colour === 'black') {
    return (
      <svg
        className={className}
        width="24"
        height="25"
        viewBox="0 0 24 25"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="chevron-down">
          <path
            id="Icon"
            d="M16.7998 10.1004L11.9998 14.9004L7.19981 10.1004"
            stroke="#11356F"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      </svg>
    );
  }

  return (
    <svg
      className={className}
      width="24"
      height="25"
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="chevron-down">
        <path
          id="Icon"
          d="M16.7998 10.1004L11.9998 14.9004L7.19981 10.1004"
          stroke="#FEFCFD"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
};

export default ChevronDown;
