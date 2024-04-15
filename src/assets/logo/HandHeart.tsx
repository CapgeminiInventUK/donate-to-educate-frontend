import { SvgProps } from '@/types/props';

const HandHeart = ({ className = '' }: SvgProps): JSX.Element => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 860" fill="none" className={className}>
      <g filter="url(#a)">
        <path
          fill="rgb(136,153,182)"
          d="m11.157 45.576 30.667 34.7 11.5 10.905s3.834 3.966 7.667 0c3.804-3.935.414-7.871.362-7.93l-.003-.004-7.93-9.116a1.276 1.276 0 0 1 1.88-1.725l8.566 8.86c0 .002 3.833 3.966 7.666 0 3.409-3.526 1.513-7.052 1.052-7.79a1.598 1.598 0 0 0-.212-.263l-9.497-9.825a1.378 1.378 0 0 1 1.981-1.916l9.551 9.88s3.834 3.966 7.667 0c3.833-3.965.362-7.93.362-7.93l-9.061-9.937a1.397 1.397 0 0 1 2.037-1.913l8.579 8.875s4.792 3.966 7.666 0c2.875-3.966 0-7.931 0-7.931l-7.666-7.931c.766.793-20.125-21.481-30.667-32.717 0 0-20.126-18.837-38.334 0-18.208 18.837-3.833 33.708-3.833 33.708Z"
        />
        <g filter="url(#b)">
          <rect
            width={23.195}
            height={12.669}
            fill="rgb(164,198,242)"
            rx={6.334}
            transform="scale(.9829 1.01682) rotate(-45 70.963 14.468)"
          />
        </g>
        <g filter="url(#c)">
          <rect
            width={28.505}
            height={12.396}
            fill="rgb(164,198,242)"
            rx={6.198}
            transform="scale(.9829 1.01682) rotate(-45 88.738 8.422)"
          />
        </g>
        <g filter="url(#d)">
          <rect
            width={23.989}
            height={12.296}
            fill="rgb(164,198,242)"
            rx={6.148}
            transform="matrix(.69501 -.719 .69501 .719 29.35 76.689)"
          />
        </g>
        <g filter="url(#e)">
          <rect
            width={17.129}
            height={12.505}
            fill="rgb(164,198,242)"
            rx={6.252}
            transform="matrix(.69501 -.719 .69501 .719 39.062 86.736)"
          />
        </g>
        <g filter="url(#f)">
          <path
            fill="rgb(164,198,242)"
            d="m58.27 10.901-12.886 20.35c-.09.142-.165.291-.215.452-.362 1.153-1.655 6.174 2.575 7.924 4.765 1.972 7.634-1.938 7.667-1.982l.002-.003 9.02-12.497a2.421 2.421 0 0 1 3.721-.247l21.67 22.906c.82.867 2.141.997 3.024.194 1.957-1.78 5.231-5.35 7.026-10.584 3.034-8.854 1.258-22.658-6.896-29.512-7-5.884-15.97-6.819-22.813-5.188-7.859 1.873-11.609 7.727-11.865 8.14l-.005.008-.025.039Z"
          />
        </g>
      </g>
    </svg>
  );
};

export default HandHeart;
