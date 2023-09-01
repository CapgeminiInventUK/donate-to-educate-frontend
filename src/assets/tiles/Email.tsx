import { SvgProps } from '@/types/props';

const Email = ({ className }: SvgProps): JSX.Element => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    width="76"
    height="75"
    viewBox="0 0 76 75"
    fill="none"
  >
    <path
      d="M13.6247 20.625L35.8652 36.0222C37.1493 36.9113 38.8501 36.9113 40.1342 36.0222L62.3747 20.625M15.4997 60H60.4997C64.6418 60 67.9997 56.6421 67.9997 52.5V22.5C67.9997 18.3579 64.6418 15 60.4997 15H15.4997C11.3576 15 7.99969 18.3579 7.99969 22.5V52.5C7.99969 56.6421 11.3576 60 15.4997 60Z"
      stroke="#050E33"
      strokeWidth="4.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default Email;
