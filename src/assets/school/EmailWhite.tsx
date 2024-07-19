import type { SvgProps } from '@/types/props';

const Email = ({ className }: SvgProps): JSX.Element => {
  return (
    <svg
      className={className}
      width="29"
      height="29"
      viewBox="0 0 29 29"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="email">
        <path
          id="Icon"
          d="M5.07539 7.9748L13.675 13.9284C14.1716 14.2722 14.8292 14.2722 15.3257 13.9284L23.9254 7.9748M5.80039 23.1998H23.2004C24.802 23.1998 26.1004 21.9014 26.1004 20.2998V8.69981C26.1004 7.09818 24.802 5.7998 23.2004 5.7998H5.80039C4.19876 5.7998 2.90039 7.09818 2.90039 8.69981V20.2998C2.90039 21.9014 4.19876 23.1998 5.80039 23.1998Z"
          stroke="#FEFCFD"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
};

export default Email;
