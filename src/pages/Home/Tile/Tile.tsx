import { FC } from 'react';
import styles from './Tile.module.scss';
import FormButton from '@/components/FormButton/FormButton';

interface TileProps {
  title: string;
  onClick: () => void;
  body: string[];
  icon: JSX.Element;
  buttonText: string;
}

const Tile: FC<TileProps> = ({ onClick, title, body, icon, buttonText }) => {
  return (
    <div className={styles.tile}>
      {icon}
      <h2>{title}</h2>
      {body.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
      <FormButton theme="formButtonGreen" text={buttonText} onClick={onClick} useArrow />
    </div>
  );
};

export default Tile;
