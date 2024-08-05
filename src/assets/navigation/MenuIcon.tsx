const MenuIcon = ({
  onClick,
  className,
}: {
  onClick?: () => void;
  className: string;
}): JSX.Element => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={25}
    fill="none"
    onClick={onClick}
    className={className}
  >
    <path
      stroke="#000"
      strokeLinecap="round"
      strokeWidth={2}
      d="M21.6 19.7H2.4m19.2-7.2H2.4m19.2-7.2H2.4"
    />
  </svg>
);

export default MenuIcon;
