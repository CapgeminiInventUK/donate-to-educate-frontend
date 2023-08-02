import { ReactElement, FC, ReactNode } from 'react';
import styles from './Layout.module.scss';

export interface LayoutProps {
  header?: ReactNode;
  footer?: ReactNode;
  page: ReactNode;
}

const Layout: FC<LayoutProps> = ({ header, footer, page }): ReactElement => {
  return (
    <div className={styles.layout}>
      <div className={styles.header}>{header}</div>
      <div className={styles.content}>{page}</div>
      <div className={styles.footer}>{footer}</div>
    </div>
  );
};

export default Layout;
