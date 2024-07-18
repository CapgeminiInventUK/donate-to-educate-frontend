import type { SvgProps } from '@/types/props';

const Heart = ({ className }: SvgProps): JSX.Element => (
  <svg
    width="29"
    height="26"
    viewBox="0 0 29 26"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M25 14.126L15.5402 23.5858C14.7592 24.3668 13.4929 24.3668 12.7118 23.5858L3.25207 14.126C0.24931 11.1233 0.249309 6.25483 3.25207 3.25207C6.25483 0.24931 11.1233 0.249309 14.126 3.25207C17.1288 0.249309 21.9972 0.24931 25 3.25207C28.0028 6.25483 28.0028 11.1233 25 14.126Z"
      stroke="#FEFCFD"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default Heart;
