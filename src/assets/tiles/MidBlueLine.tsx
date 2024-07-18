import type { SvgProps } from '@/types/props';
import type { FC } from 'react';

const MidBlueLine: FC<SvgProps> = ({ className }) => (
  <svg
    width="450"
    height="8"
    viewBox="0 0 450 8"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path d="M0 4C0 1.79086 1.79086 0 4 0H99V8H4C1.79086 8 0 6.20914 0 4Z" fill="#11356F" />
    <path
      d="M99 0H446C448.209 0 450 1.79086 450 4C450 6.20914 448.209 8 446 8H99V0Z"
      fill="#97C8EB"
    />
  </svg>
);

export default MidBlueLine;
