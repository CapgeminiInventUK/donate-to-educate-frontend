import { SvgProps } from '@/types/props';

const House = ({ className }: SvgProps): JSX.Element => {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="29"
      height="29"
      viewBox="0 0 29 29"
      fill="none"
    >
      <path
        d="M8.6999 21.0234H20.2999M13.6036 3.17061L3.55024 9.96932C3.14223 10.2452 2.8999 10.6919 2.8999 11.168V23.8921C2.8999 25.1106 3.9386 26.0984 5.2199 26.0984H23.7799C25.0612 26.0984 26.0999 25.1106 26.0999 23.8921V11.168C26.0999 10.6919 25.8576 10.2452 25.4496 9.96932L15.3962 3.17062C14.8596 2.80771 14.1402 2.80771 13.6036 3.17061Z"
        stroke="#FEFCFD"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default House;
