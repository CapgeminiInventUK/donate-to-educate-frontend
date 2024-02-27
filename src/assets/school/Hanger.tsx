import { SvgProps } from '@/types/props';

const Hanger = ({ className, colour, width, height }: SvgProps): JSX.Element => {
  return (
    <svg
      className={className}
      width={width ?? '31'}
      height={height ?? '30'}
      viewBox="0 0 31 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="travel-hotel-hanger--hanger-locker-check-coat-room-cloak">
        <g id="Group">
          <path
            id="Vector"
            d="M19.7843 6.42829C19.7843 5.58066 19.533 4.75206 19.062 4.04728C18.5911 3.3425 17.9218 2.79319 17.1387 2.46881C16.3556 2.14444 15.4939 2.05956 14.6625 2.22493C13.8312 2.39029 13.0675 2.79847 12.4681 3.39784C11.8688 3.9972 11.4606 4.76085 11.2952 5.59219C11.1299 6.42354 11.2147 7.28525 11.5391 8.06837C11.8635 8.85148 12.4128 9.52082 13.1176 9.99174C13.8224 10.4627 14.651 10.714 15.4986 10.714V12.8569"
            stroke={colour ?? '#050E33'}
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            id="Vector_2"
            d="M15.4994 12.8564L2.64226 22.7136C2.30082 22.9841 2.02648 23.3299 1.84063 23.7239C1.65479 24.1179 1.56245 24.5495 1.57084 24.985C1.57084 25.7466 1.87336 26.4769 2.41186 27.0154C2.95036 27.5539 3.68071 27.8564 4.44226 27.8564H26.5565C27.3181 27.8564 28.0485 27.5539 28.587 27.0154C29.1255 26.4769 29.428 25.7466 29.428 24.985C29.4364 24.5495 29.344 24.1179 29.1582 23.7239C28.9723 23.3299 28.698 22.9841 28.3565 22.7136L15.4994 12.8564Z"
            stroke="#050E33"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      </g>
    </svg>
  );
};

export default Hanger;
