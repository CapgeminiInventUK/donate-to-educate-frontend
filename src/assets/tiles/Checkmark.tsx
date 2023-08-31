import { CheckmarkProps } from '@/types/props';

const Checkmark = ({ className, isChecked }: CheckmarkProps): JSX.Element => (
  <svg
    focusable="false"
    viewBox="0 0 15 11"
    fill="none"
    // This element is purely decorative so
    // we hide it for screen readers
    aria-hidden="true"
    className={className}
  >
    <path d="M1 4.5L5 9L14 1" strokeWidth="3" stroke={isChecked ? '#394150' : 'none'} />
  </svg>
);

export default Checkmark;
