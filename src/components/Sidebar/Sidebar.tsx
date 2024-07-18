import CloseIcon from '@assets/navigation/CloseIcon';
import MenuIcon from '@assets/navigation/MenuIcon';
import useOnClickAwayListener from '@hooks/useOnClickAwayListener';
import { type FC, useCallback, useRef, useState } from 'react';
import ClickableLogo from '../ClickableLogo/ClickableLogo';
import NavLinks from '../NavLinks/NavLinks';
import styles from './Sidebar.module.scss';

const Sidebar: FC = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const containerRef = useRef<HTMLElement>(null);

  useOnClickAwayListener(
    containerRef,
    useCallback(() => setIsDrawerOpen(false), [])
  );

  const onLinkClicked = (): void => {
    setIsDrawerOpen(false);
  };

  return (
    <nav className={styles.container} ref={containerRef}>
      <div className={styles.nav}>
        <MenuIcon
          className={`${styles.menuIcon}`}
          onClick={(): void => setIsDrawerOpen(!isDrawerOpen)}
        />
        <ClickableLogo colour="blue" className={styles.logoBlue} />
      </div>
      {isDrawerOpen && (
        <div className={styles.drawer}>
          <CloseIcon className={styles.closeIcon} onClick={(): void => setIsDrawerOpen(false)} />
          <div className={styles.navContainer}>
            <ClickableLogo colour="white" className={styles.logoWhite} />
            <NavLinks
              className={styles.links}
              linkClassName={styles.link}
              activeClassName={styles.active}
              buttonClassName={styles.navButton}
              onLinkClicked={onLinkClicked}
            />
          </div>
        </div>
      )}
    </nav>
  );
};

export default Sidebar;
