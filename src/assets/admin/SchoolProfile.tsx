import type { SvgProps } from '@/types/props';

const SchoolProfile = ({ className }: SvgProps): JSX.Element => {
  return (
    <svg
      className={className}
      width="50"
      height="50"
      viewBox="0 0 50 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="Frame 1000002025">
        <rect width="50" height="50" rx="25" fill="#2F6E41" />
        <path
          id="Icon"
          d="M15.375 35.5C16.0475 34.7468 19.1974 31.2806 20.1204 31.2806H29.8802C31.2178 31.2806 33.9483 34.1538 34.625 35.1666M39 25C39 32.732 32.732 39 25 39C17.268 39 11 32.732 11 25C11 17.268 17.268 11 25 11C32.732 11 39 17.268 39 25ZM30.015 20.2283C30.015 17.5573 27.7602 15.375 25.0004 15.375C22.2407 15.375 19.9859 17.5573 19.9859 20.2283C19.9859 22.8992 22.2407 25.0815 25.0004 25.0815C27.7601 25.0815 30.015 22.8992 30.015 20.2283Z"
          stroke="#FEFCFD"
          strokeWidth="2.5"
        />
      </g>
    </svg>
  );
};

export default SchoolProfile;
