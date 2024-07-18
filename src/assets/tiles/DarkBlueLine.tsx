import type { SvgProps } from '@/types/props';
import type { FC } from 'react';

const DarkBlueLine: FC<SvgProps> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={450}
    height={8}
    fill="none"
    viewBox="0 0 450 8"
    className={className}
  >
    <path fill="#97C8EB" d="M0 4a4 4 0 0 1 4-4h95v8H4a4 4 0 0 1-4-4Z" />
    <path fill="#0075A2" d="M99 0h347a4 4 0 0 1 0 8H99V0Z" />
  </svg>
);

export default DarkBlueLine;
