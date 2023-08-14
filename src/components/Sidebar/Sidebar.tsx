import { ReactElement, FC, useState, useEffect, RefObject, useRef } from 'react';
import styles from './Sidebar.module.scss';
import MenuIcon from '../../assets/navigation/MenuIcon';
import LogoBlue from '../../assets/logo/LogoBlue';
import LogoWhite from '../../assets/logo/LogoWhite';
import CloseIcon from '../../assets/navigation/CloseIcon';
import routes from '../../config/routes';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Button from '../Button/Button';
import Paths from '../../config/paths';

const checkIfRefContainsMouseEvent = (
  ref: RefObject<HTMLInputElement>,
  event: MouseEvent
): boolean => {
  return ref.current !== null && ref.current.contains(event.target as Node);
};

const Sidebar: FC = (): ReactElement => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const containerRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
      if (!checkIfRefContainsMouseEvent(containerRef, event)) {
        setIsDrawerOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [containerRef, isDrawerOpen]);

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
        />
      </div>
      {isDrawerOpen && (
        <div className={styles.drawer}>
          <CloseIcon className={styles.closeIcon} onClick={(): void => setIsDrawerOpen(false)} />
          <div className={styles.navContainer}>
            <LogoWhite className={styles.logoWhite} onClick={(): void => navigate(Paths.HOME)} />
            <ul className={styles.links}>
              {routes.map(({ name, path }) => {
                if (name) {
                  return (
                    <li
                      key={name}
                      className={`${styles.link} ${
                        pathname === (path as string) ? styles.active : ''
                      }`}
                    >
                      <Link to={path}>{name}</Link>
                    </li>
                  );
                }
              })}
            </ul>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Sidebar;
