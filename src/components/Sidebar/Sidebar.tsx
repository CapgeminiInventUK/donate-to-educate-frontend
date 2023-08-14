import { ReactElement, FC, useState, useEffect, RefObject, useRef } from 'react';
import styles from './Sidebar.module.scss';
import MenuIcon from '../../assets/navigation/MenuIcon';
import LogoBlue from '../../assets/logo/LogoBlue';
import LogoWhite from '../../assets/logo/LogoWhite';
import CloseIcon from '../../assets/navigation/CloseIcon';
import routes from '../../config/routes';
import { Link, useNavigate } from 'react-router-dom';

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
        <MenuIcon className={styles.menuIcon} onClick={(): void => setIsDrawerOpen(true)} />
        <LogoBlue className={styles.logoBlue} onClick={(): void => navigate('/')} />
        <button className={styles.button}>Donate</button>
      </div>
      {isDrawerOpen && (
        <div className={styles.drawer}>
          <CloseIcon className={styles.closeIcon} onClick={(): void => setIsDrawerOpen(false)} />
          <div className={styles.navContainer}>
            <LogoWhite className={styles.logoWhite} onClick={(): void => navigate('/')} />
            <ul className={styles.links}>
              {routes.map(({ name, path }) => {
                if (name) {
                  return (
                    <li key={name} className={styles.link}>
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
