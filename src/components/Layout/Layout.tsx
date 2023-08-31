import { FC } from 'react';
import styles from './Layout.module.scss';
import { LayoutProps } from '@/types/props';

const Layout: FC<LayoutProps> = ({ header, footer, page }) => (
  <div className={styles.layout}>
    <div className={styles.header}>{header}</div>
    <main className={styles.content}>{page}</main>
    <div className={styles.footer}>{footer}</div>
  </div>
);

export default Layout;
