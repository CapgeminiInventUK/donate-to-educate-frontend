import { ReactElement, FC, useState, useRef, useCallback } from 'react';
import styles from './Sidebar.module.scss';
import MenuIcon from '../../assets/navigation/MenuIcon';
import LogoBlue from '../../assets/logo/LogoBlue';
import LogoWhite from '../../assets/logo/LogoWhite';
import CloseIcon from '../../assets/navigation/CloseIcon';
import { useNavigate } from 'react-router-dom';
import Button from '../Button/Button';
import Paths from '../../config/paths';
import useOnClickAwayListener from '../../hooks/useOnClickAwayListener';
import NavLinks from '../NavLinks/NavLinks';

const Sidebar: FC = (): ReactElement => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const containerRef = useRef<HTMLElement>(null);
  const navigate = useNavigate();

  useOnClickAwayListener(
    containerRef,
    useCallback(() => setIsDrawerOpen(false), [setIsDrawerOpen])
  );

  return (
    <nav className={styles.container} ref={containerRef}>
      <div className={styles.nav}>
        <MenuIcon
          className={styles.menuIcon}
          onClick={(): void => setIsDrawerOpen(!isDrawerOpen)}
        />
        <LogoBlue className={styles.logoBlue} onClick={(): void => navigate(Paths.HOME)} />
        <Button
          theme="darkBlue"
          text="Donate"
          onClick={(): void => navigate(Paths.DONATE)}
          className={styles.hide400}
          disabled
        />
      </div>
      {isDrawerOpen && (
        <div className={styles.drawer}>
          <CloseIcon className={styles.closeIcon} onClick={(): void => setIsDrawerOpen(false)} />
          <div className={styles.navContainer}>
            <LogoWhite className={styles.logoWhite} onClick={(): void => navigate(Paths.HOME)} />
            <NavLinks
              theme="midBlue"
              className={styles.links}
              linkClassName={styles.link}
              activeClassName={styles.active}
              buttonClassName={styles.navButton}
            />
          </div>
        </div>
      )}
    </nav>
  );
};

export default Sidebar;
