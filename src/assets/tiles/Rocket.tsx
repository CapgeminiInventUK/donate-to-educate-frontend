import { SvgProps } from '@/types/props';

const Rocket = ({ className }: SvgProps): JSX.Element => (
  <svg
    width="26"
    height="26"
    viewBox="0 0 26 26"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M12.6922 17.0001L8.9999 13.3078M12.6922 17.0001C14.4113 16.3463 16.0606 15.5216 17.6152 14.5386M12.6922 17.0001V23.1539C12.6922 23.1539 16.4213 22.477 17.6152 20.6924C18.9444 18.6985 17.6152 14.5386 17.6152 14.5386M8.9999 13.3078C9.65484 11.6087 10.4795 9.97996 11.4614 8.44636C12.8955 6.15345 14.8923 4.26555 17.2619 2.96224C19.6316 1.65892 22.2953 0.983531 24.9997 1.0003C24.9997 4.34795 24.0397 10.231 17.6152 14.5386M8.9999 13.3078H2.84613C2.84613 13.3078 3.52304 9.57866 5.30764 8.38483C7.30146 7.05561 11.4614 8.38483 11.4614 8.38483M3.46151 18.8462C1.61538 20.397 1 25 1 25C1 25 5.60302 24.3846 7.15377 22.5385C8.0276 21.5047 8.0153 19.917 7.043 18.957C6.56461 18.5004 5.93445 18.2366 5.27345 18.2161C4.61246 18.1957 3.96719 18.4201 3.46151 18.8462Z"
      stroke="#11356F"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default Rocket;
