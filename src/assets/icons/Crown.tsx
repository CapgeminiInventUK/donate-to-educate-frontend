import { FC } from 'react';

const Crown: FC = () => (
  <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="50" height="50" rx="25" fill="#050E33" />
    <g clipPath="url(#clip0_10982_100827)">
      <path d="M42.4375 6.5625H7.5625V41.4375H42.4375V6.5625Z" fill="url(#pattern0_10982_100827)" />
    </g>
    <defs>
      <pattern
        id="pattern0_10982_100827"
        patternContentUnits="objectBoundingBox"
        width="1"
        height="1"
      >
        <use xlinkHref="#image0_10982_100827" transform="scale(0.00125)" />
      </pattern>
      <clipPath id="clip0_10982_100827">
        <rect width="36" height="36" fill="white" transform="translate(7 6)" />
      </clipPath>
      <image id="image0_10982_100827" width="800" height="800" />
    </defs>
  </svg>
);
export default Crown;
