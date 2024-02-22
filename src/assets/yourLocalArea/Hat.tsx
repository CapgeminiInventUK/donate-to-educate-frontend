import { SvgProps } from '@/types/props';

const Hat = ({ className }: SvgProps): JSX.Element => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="50"
    height="50"
    viewBox="0 0 50 50"
    fill="none"
    className={className}
  >
    <rect width="50" height="50" rx="25" fill="#97C8EB" />
    <path
      d="M14.311 26.6789V30.8454C14.311 31.9278 14.9041 32.936 15.853 33.455L23.2667 37.5028C24.1563 37.9921 25.2238 37.9921 26.1135 37.5028L33.5271 33.455C34.476 32.936 35.0691 31.9278 35.0691 30.8454V26.6789L26.1135 31.5719C25.2238 32.0612 24.1563 32.0612 23.2667 31.5719L14.311 26.6789ZM23.2667 12.3559L10.7673 19.1764C9.74423 19.7398 9.74423 21.2225 10.7673 21.786L23.2667 28.6065C24.1563 29.0958 25.2238 29.0958 26.1135 28.6065L38.0346 22.0973V30.8602C38.0346 31.6757 38.7018 32.3429 39.5173 32.3429C40.3328 32.3429 41 31.6757 41 30.8602V21.356C41 20.8074 40.7035 20.3181 40.229 20.0512L26.1135 12.3559C25.2238 11.8814 24.1563 11.8814 23.2667 12.3559Z"
      fill="#11356F"
    />
  </svg>
);

export default Hat;
