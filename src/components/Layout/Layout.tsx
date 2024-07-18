import type { LayoutProps } from '@/types/props';
import { motion, useScroll, useSpring } from 'framer-motion';
import type { FC } from 'react';
import MvpBanner from '../MvpBanner/MvpBanner';
import styles from './Layout.module.scss';

const Layout: FC<LayoutProps> = ({ header, footer, page }) => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 1000,
    damping: 50,
    restDelta: 0.1,
  });

  return (
    <div className={styles.layout}>
      <motion.div className={styles.progressBar} style={{ scaleX }} tabIndex={-1} />
      <div className={styles.header}>{header}</div>
      <main className={styles.content}>
        <MvpBanner />
        {page}
      </main>
      <div className={styles.footer}>{footer}</div>
    </div>
  );
};

export default Layout;
