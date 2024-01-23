import { FC } from 'react';
import styles from './Tile.module.scss';
import FormButton from '@/components/FormButton/FormButton';

interface TileProps {
  title: string;
  onClick: () => void;
  body: string[];
  icon: JSX.Element;
}

const Tile: FC<TileProps> = ({ onClick, title, body, icon }) => {
  return (
    <div className={styles.tile}>
      {icon}
      <h2>{title}</h2>
      {body.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
      <FormButton theme="formButtonDarkBlue" text="Get started" onClick={onClick} useArrow />
    </div>
  );
};

export default Tile;
