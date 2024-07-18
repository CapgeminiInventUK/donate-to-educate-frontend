import type { SvgProps } from '@/types/props';

const InterfaceArrowTopRight = ({ className }: SvgProps): JSX.Element => {
  return (
    <svg
      className={className}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g
        id="interface-arrows-expand-5--expand-small-bigger-retract-smaller-big"
        clipPath="url(#clip0_6294_18429)"
      >
        <g id="Group">
          <path
            id="Vector"
            d="M15.4294 9.14272V14.2856C15.4294 14.5887 15.309 14.8794 15.0947 15.0937C14.8803 15.308 14.5897 15.4284 14.2866 15.4284H1.71512C1.41202 15.4284 1.12133 15.308 0.907001 15.0937C0.692673 14.8794 0.572266 14.5887 0.572266 14.2856V1.71415C0.572266 1.41104 0.692673 1.12035 0.907001 0.906024C1.12133 0.691697 1.41202 0.571289 1.71512 0.571289H6.85798"
            stroke="#050E33"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            id="Vector_2"
            d="M11.4297 0.571289H15.4297V4.57129"
            stroke="#050E33"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            id="Vector_3"
            d="M15.4286 0.571289L8 7.99986"
            stroke="#050E33"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      </g>
      <defs>
        <clipPath id="clip0_6294_18429">
          <rect width="16" height="16" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default InterfaceArrowTopRight;
