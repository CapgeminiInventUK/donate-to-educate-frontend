import { FC } from 'react';
import styles from './Layout.module.scss';
import { LayoutProps } from '@/types/props';
import { motion, useScroll, useSpring } from 'framer-motion';

const Layout: FC<LayoutProps> = ({ header, footer, page }) => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 1000,
    damping: 50,
    restDelta: 0.1,
  });

  return (
    <div className={styles.layout}>
      <motion.div className={styles.progressBar} style={{ scaleX }} />
      <div className={styles.header}>{header}</div>
      <main className={styles.content}>{page}</main>
      <div className={styles.footer}>{footer}</div>
    </div>
  );
};

export default Layout;
