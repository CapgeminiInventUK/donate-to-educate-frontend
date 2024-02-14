import { SvgProps } from '@/types/props';

const EditIcon = ({ className = '' }: SvgProps): JSX.Element => {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="25"
      viewBox="0 0 24 25"
      fill="none"
    >
      <g id="shopping-catergories-shirt--clothing-t-shirt-men-top">
        <path
          id="Icon"
          d="M11.0492 3.85143H5.04922C3.06099 3.85143 1.44922 5.46321 1.44922 7.45143V19.4515C1.44922 21.4398 3.06099 23.0515 5.04922 23.0515H17.0492C19.0374 23.0515 20.6492 21.4398 20.6492 19.4515L20.6492 13.4515M7.44922 17.0514L11.8152 16.1717C12.047 16.125 12.2598 16.0109 12.4269 15.8437L22.2006 6.06461C22.6692 5.59576 22.6689 4.83577 22.1999 4.36731L20.1295 2.29923C19.6607 1.83097 18.9011 1.83129 18.4327 2.29995L8.65798 12.08C8.49117 12.2469 8.37727 12.4593 8.33052 12.6906L7.44922 17.0514Z"
          stroke="#394150"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
};

export default EditIcon;
