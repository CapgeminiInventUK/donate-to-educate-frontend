import type { TileProps } from '@/types/props';
import { motion } from 'framer-motion';
import type { FC } from 'react';
import styles from './Tile.module.scss';

const Tile: FC<TileProps> = ({ onClick, title, body, icon, size, noShadow, children }) => {
  return (
    <motion.div
      className={`${styles.tile} ${size === 'small' ? styles.small : styles.medium} ${noShadow === true ? styles.noShadow : ''}`}
      whileHover={{ scale: 1.05 }}
      onClick={onClick}
    >
      {icon}
      <h3>{title}</h3>
      {body.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
      <div className={styles.children}>{children}</div>
    </motion.div>
  );
};

export default Tile;
