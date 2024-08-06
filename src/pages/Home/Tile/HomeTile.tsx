import { FC } from 'react';
import styles from './HomeTile.module.scss';
import FormButton from '@/components/FormButton/FormButton';
import { motion } from 'framer-motion';
import { HomeTileProps } from '@/types/props';

const HomeTile: FC<HomeTileProps> = ({ onClick, title, body, icon, buttonText }) => {
  return (
    <motion.div className={styles.tile} whileHover={{ scale: 1.05 }}>
      {icon}
      <h2>{title}</h2>
      {body.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
      <FormButton
        theme="formButtonGreen"
        text={buttonText}
        onClick={onClick}
        useArrow
        ariaLabel={buttonText}
      />
    </motion.div>
  );
};

export default HomeTile;
