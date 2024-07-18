import type { SvgProps } from '@/types/props';

const Archive = ({ className }: SvgProps): JSX.Element => {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="50"
      height="51"
      viewBox="0 0 50 51"
      fill="none"
    >
      <rect y="0.806641" width="50" height="50" rx="25" fill="#4A8FE7" />
      <path
        d="M36.9152 19.8066H13.0848M28.7495 23.9316C25.8206 23.9316 21.2495 23.9316 21.2495 23.9316M37 20.5148V34.8066C37 36.4635 35.6569 37.8066 34 37.8066H16C14.3431 37.8066 13 36.4635 13 34.8066V20.5148C13 20.0491 13.1084 19.5898 13.3167 19.1732L15.3781 15.0504C15.7592 14.2881 16.5383 13.8066 17.3906 13.8066H32.6094C33.4617 13.8066 34.2408 14.2881 34.6219 15.0504L36.6833 19.1732C36.8916 19.5898 37 20.0491 37 20.5148Z"
        stroke="#FEFCFD"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default Archive;
