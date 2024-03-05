import { SvgProps } from '@/types/props';

const ExtraStock = ({ className, colour, width, height }: SvgProps): JSX.Element => {
  return (
    <svg
      className={className}
      width={width ?? '33'}
      height={height ?? '36'}
      viewBox="0 0 33 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        id="Vector"
        d="M29.822 9.8243L15.661 1.64844L1.5 9.8243V26.176L15.661 34.3519M29.822 9.8243L15.661 19.0221M29.822 9.8243V18.0002M15.661 34.3519V19.0221M15.661 34.3519L18.726 32.5823M15.661 19.0221L2.37523 10.8463M21.7929 13.9122L8.50713 5.73637M22.3022 27.709H26.9017M26.9017 27.709H31.5M26.9017 27.709L26.9017 23.11M26.9017 27.709V32.3079"
        stroke={colour ?? '#FEFCFD'}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default ExtraStock;
