import { SvgProps } from '@/types/props';

const Heart = ({ className }: SvgProps): JSX.Element => {
  return (
    <svg
      className={className}
      width="31"
      height="30"
      viewBox="0 0 31 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="interface-favorite-heart--reward-social-rating-media-heart-it-like-favorite-love">
        <path
          id="Vector"
          d="M15.5001 26.6791L3.67149 15.9648C-2.75708 9.53619 6.69292 -2.80666 15.5001 7.17905C24.3072 -2.80666 33.7143 9.57905 27.3286 15.9648L15.5001 26.6791Z"
          stroke="#FEFCFD"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
};

export default Heart;
