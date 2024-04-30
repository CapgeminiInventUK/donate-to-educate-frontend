import { FC } from 'react';
import styles from './Tile.module.scss';
import { motion } from 'framer-motion';

interface TileProps {
  title: string;
  onClick: () => void;
  body: string[];
  icon: JSX.Element;
  size: string;
  children?: React.ReactNode;
  noShadow?: boolean;
}

const Tile: FC<TileProps> = ({ onClick, title, body, icon, size, noShadow, children }) => {
  return (
    <motion.div
      className={`${styles.tile} ${size === 'small' ? styles.small : styles.medium} ${noShadow === true ? styles.noShadow : ''}`}
      whileHover={{ scale: 1.05 }}
      onClick={onClick}
    >
      {icon}
      <h2>{title}</h2>
      {body.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
      <div className={styles.children}>{children}</div>
    </motion.div>
  );
};

export default Tile;
