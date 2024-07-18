import type { SvgProps } from '@/types/props';

const PlusIcon = ({ className = '' }: SvgProps): JSX.Element => {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="25"
      viewBox="0 0 24 25"
      fill="none"
    >
      <g opacity="0.9">
        <path
          d="M15.5984 12.4998H11.9984M11.9984 12.4998H8.39844M11.9984 12.4998V16.0998M11.9984 12.4998L11.9984 8.8998M21.5984 12.5004C21.5984 17.8023 17.3004 22.1004 11.9984 22.1004C6.6965 22.1004 2.39844 17.8023 2.39844 12.5004C2.39844 7.19846 6.6965 2.90039 11.9984 2.90039C17.3004 2.90039 21.5984 7.19846 21.5984 12.5004Z"
          stroke="#FEFCFD"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
};

export default PlusIcon;
