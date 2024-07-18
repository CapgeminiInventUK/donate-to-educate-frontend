import type { SvgProps } from '@/types/props';

const EmailSolid = ({ className }: SvgProps): JSX.Element => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    width="98"
    height="97"
    viewBox="0 0 98 97"
    fill="none"
  >
    <rect x="0.5" width="97" height="97" rx="48.5" fill="#4A8FE7" />
    <path
      d="M25.4873 31.4873L47.1833 46.5076C48.4361 47.3749 50.0952 47.3749 51.3479 46.5076L73.0439 31.4873M27.3164 69.8984H71.2148C75.2556 69.8984 78.5312 66.6228 78.5312 62.582V33.3164C78.5312 29.2757 75.2556 26 71.2148 26H27.3164C23.2757 26 20 29.2757 20 33.3164V62.582C20 66.6228 23.2757 69.8984 27.3164 69.8984Z"
      stroke="#FEFCFD"
      strokeWidth="6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default EmailSolid;
