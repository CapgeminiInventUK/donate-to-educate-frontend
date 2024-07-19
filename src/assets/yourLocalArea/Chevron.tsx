import type { SvgProps } from '@/types/props';

const Chevron = ({
  className,
  direction,
}: SvgProps & { direction: 'up' | 'down' }): JSX.Element => {
  if (direction === 'up') {
    return (
      <svg
        className={className}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
      >
        <path
          d="M7.19922 14.3996L11.9992 9.59961L16.7992 14.3996"
          stroke="#386EB3"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M16.8008 9.60039L12.0008 14.4004L7.20078 9.60039"
        stroke="#386EB3"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default Chevron;
