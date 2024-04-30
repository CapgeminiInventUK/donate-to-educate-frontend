import { FC } from 'react';
import styles from './Tile.module.scss';
import { motion } from 'framer-motion';

interface TileProps {
  title: string;
  onClick: () => void;
  body: string[];
  icon: JSX.Element;
  size: string;
}

const Tile: FC<TileProps> = ({ onClick, title, body, icon, size }) => {
  return (
    <motion.div
      className={`${styles.tile} ${size === 'small' ? styles.small : styles.medium}`}
      whileHover={{ scale: 1.05 }}
      onClick={onClick}
    >
      {icon}
      <h2>{title}</h2>
      {body.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
    </motion.div>
  );
};

export default Tile;
