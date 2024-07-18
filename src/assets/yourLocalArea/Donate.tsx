import type { SvgProps } from '@/types/props';

const Donate = ({ className }: SvgProps): JSX.Element => (
  <svg
    width="50"
    height="50"
    viewBox="0 0 50 50"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <rect width="50" height="50" rx="25" fill="#0075A2" />
    <path
      d="M38.3672 32.5112L33.8757 28.0196C33.1783 27.3222 32.2298 26.9316 31.244 26.9316H29.998L28.1381 27.8616H24.4184C23.3955 27.8616 22.5586 28.6985 22.5586 29.7214V31.5812"
      stroke="#FEFCFD"
      strokeWidth="1.85984"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M32.7846 38.0867L30.9248 36.2269H19.7658L11.3965 27.8576L12.8565 27.4949C14.2792 27.1416 15.795 27.467 16.9388 28.3877L20.6957 31.5773H28.135"
      stroke="#FEFCFD"
      strokeWidth="1.85984"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M20.1719 13.6775C20.7886 12.4963 22.0952 11.7228 23.5481 11.911C25.2205 12.12 26.4435 13.6252 26.4435 15.3081C26.4435 17.1268 25.7223 18.8724 24.4366 20.1581L20.1719 24.4227L15.9073 20.1581C14.6216 18.8724 13.9004 17.1268 13.9004 15.3081C13.9004 13.5311 15.2592 11.9841 17.0362 11.8901C18.395 11.8169 19.5971 12.559 20.1719 13.6879V13.6775Z"
      fill="#FEFCFD"
      stroke="#FEFCFD"
      strokeWidth="2.50862"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default Donate;
