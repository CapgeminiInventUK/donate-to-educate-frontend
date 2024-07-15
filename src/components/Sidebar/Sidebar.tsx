import { FC, useState, useRef, useCallback } from 'react';
import styles from './Sidebar.module.scss';
import MenuIcon from '@assets/navigation/MenuIcon';
import CloseIcon from '@assets/navigation/CloseIcon';
import useOnClickAwayListener from '@hooks/useOnClickAwayListener';
import NavLinks from '../NavLinks/NavLinks';
import ClickableLogo from '../ClickableLogo/ClickableLogo';

const Sidebar: FC = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const containerRef = useRef<HTMLElement>(null);

  useOnClickAwayListener(
    containerRef,
    useCallback(() => setIsDrawerOpen(false), [setIsDrawerOpen])
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
