import { SvgProps } from '@/types/props';

const PackagePlusIcon = ({ className }: SvgProps): JSX.Element => {
  return (
    <svg
      className={className}
      width="50"
      height="50"
      viewBox="0 0 50 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="50" height="50" rx="25" fill="#97C8EB" />
      <path
        d="M35.6576 18.4587L24.3288 11.918L13 18.4587V31.54L24.3288 38.0807M35.6576 18.4587L24.3288 25.8169M35.6576 18.4587V24.9993M24.3288 38.0807V25.8169M24.3288 38.0807L26.7808 36.6651M24.3288 25.8169L13.7002 19.2762M29.2343 21.729L18.6057 15.1883M29.6417 32.7664H33.3214M33.3214 32.7664H37M33.3214 32.7664L33.3214 29.0873M33.3214 32.7664V36.4455"
        stroke="#050E33"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default PackagePlusIcon;
