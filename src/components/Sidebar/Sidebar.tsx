import { FC, useState, useRef, useCallback } from 'react';
import styles from './Sidebar.module.scss';
import MenuIcon from '@assets/navigation/MenuIcon';
import CloseIcon from '@assets/navigation/CloseIcon';
import useOnClickAwayListener from '@hooks/useOnClickAwayListener';
import NavLinks from '../NavLinks/NavLinks';
import ClickableLogo from '../ClickableLogo/ClickableLogo';
import Button from '../Button/Button';

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
        <Button
          ariaLabel="hamburger-menu"
          onClick={(): void => setIsDrawerOpen(!isDrawerOpen)}
          theme="link"
          text={<MenuIcon className={`${styles.menuIcon}`} />}
          className={styles.noPadding}
        />
        <ClickableLogo colour="blue" className={styles.logoBlue} />
      </div>
      {isDrawerOpen && (
        <div className={styles.drawer}>
          <Button
            ariaLabel="close-menu"
            onClick={(): void => setIsDrawerOpen(false)}
            theme="link"
            text={<CloseIcon />}
            className={styles.closeIcon}
          />

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
