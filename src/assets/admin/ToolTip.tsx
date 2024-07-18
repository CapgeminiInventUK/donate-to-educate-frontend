import type { SvgProps } from '@/types/props';

const ToolTip = ({ className }: SvgProps): JSX.Element => {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M12.0004 11.9999L12.0004 16.7999M12.0004 8.44209V8.3999M2.40039 11.9999C2.40039 6.69797 6.69846 2.3999 12.0004 2.3999C17.3023 2.3999 21.6004 6.69797 21.6004 11.9999C21.6004 17.3018 17.3023 21.5999 12.0004 21.5999C6.69846 21.5999 2.40039 17.3018 2.40039 11.9999Z"
        stroke="#11356F"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default ToolTip;
