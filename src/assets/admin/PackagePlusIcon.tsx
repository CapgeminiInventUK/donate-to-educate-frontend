import { SvgProps } from '@/types/props';

const PackagePlusIcon = ({ className }: SvgProps): JSX.Element => {
  return (
    <svg
      className={className}
      width="28"
      height="30"
      viewBox="0 0 28 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* <rect width="50" height="50" rx="25" fill="#11356F" /> */}
      <path
        d="M24.6576 8.45866L13.3288 1.91797L2 8.45866V21.54L13.3288 28.0807M24.6576 8.45866L13.3288 15.8169M24.6576 8.45866V14.9993M13.3288 28.0807V15.8169M13.3288 28.0807L15.7808 26.6651M13.3288 15.8169L2.70019 9.27624M18.2343 11.729L7.6057 5.18831M18.6417 22.7664H22.3214M22.3214 22.7664H26M22.3214 22.7664L22.3214 19.0873M22.3214 22.7664V26.4455"
        stroke="#050E33"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default PackagePlusIcon;
