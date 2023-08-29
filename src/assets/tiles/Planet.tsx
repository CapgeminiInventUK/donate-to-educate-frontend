import { SvgProps } from '@/types/props';

const Planet = ({ className }: SvgProps): JSX.Element => (
  <svg
    width="26"
    height="26"
    viewBox="0 0 26 26"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M22 20.9375L17.6154 15.7692H14.8462L13 13.9231L16.6923 8.38462H23.1538M6.53846 3.76923L8.83198 6.06275C9.68057 6.91134 9.94179 8.18399 9.49609 9.29824L9.13895 10.1911C8.68336 11.3301 7.58023 12.0769 6.35352 12.0769H1.92308M25 13C25 19.6274 19.6274 25 13 25C6.37258 25 1 19.6274 1 13C1 6.37258 6.37258 1 13 1C19.6274 1 25 6.37258 25 13Z"
      stroke="#11356F"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default Planet;
