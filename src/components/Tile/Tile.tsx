import { FC } from 'react';
import styles from './Tile.module.scss';
import { motion } from 'framer-motion';
import { TileProps } from '@/types/props';

const Tile: FC<TileProps> = ({
  onClick,
  title,
  body,
  icon,
  size,
  noShadow,
  children,
  hoverScale = 1.05,
  titleLarge = false,
}) => {
  return (
    <motion.div
      className={`${styles.tile} ${size === 'small' ? styles.small : styles.medium} ${noShadow === true ? styles.noShadow : ''} ${onClick ? styles.clickable : ''}`}
      whileHover={{ scale: hoverScale }}
      onClick={onClick ?? undefined}
    >
      {icon}
      {titleLarge ? <h2>{title}</h2> : <h3>{title}</h3>}
      {body.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
      <div className={styles.children}>{children}</div>
    </motion.div>
  );
};

export default Tile;
