import { FC, MouseEvent, useState } from 'react';
import { NavLinkProps } from '@/types/props';
import styles from './NavLink.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import ChevronDown from '@/assets/navigation/ChevronDown';
import Paths from '@/config/paths';
import { useStore } from '@/stores/useStore';

const NavLink: FC<NavLinkProps> = ({ name, path, childRoutes, onLinkClicked }) => {
  const [showSubMenu, setShowSubMenu] = useState(false);
  const user = useStore((state) => state.user);
  const navigate = useNavigate();

  // eslint-disable-next-line no-console
  console.log({ name, path, childRoutes, onLinkClicked });

  if (!name) {
    return;
  }

  const handleClick = (event: MouseEvent<HTMLElement>, path: Paths): void => {
    event.preventDefault();

    if (childRoutes && childRoutes?.length > 0) {
      setShowSubMenu(!showSubMenu);
    } else {
      handleLinkClick(path);
    }
  };

  const pathIsLogin = path === Paths.LOGIN || path === Paths.SIGN_IN;
  const handleLinkClick = (path: Paths): void => {
    if (onLinkClicked) {
      onLinkClicked();
    }

    if (pathIsLogin) {
      navigate(user ? Paths.SIGN_IN : path);
    } else if (path !== Paths.ABOUT) {
      navigate(path);
    }
  };

  return (
    <div className={`${styles.linkContainer} ${pathIsLogin ? styles.navButton : ''}`} key={name}>
      <Link
        className={`${styles.link} ${pathIsLogin ? styles.accentLink : ''} ${path === Paths.SIGN_IN ? styles.loginLink : ''}`}
        onClick={(event) => handleClick(event, path)}
        to={path}
      >
        <span className={!pathIsLogin ? styles.linkText : ''}>
          {user && pathIsLogin ? 'Your profile' : name}
        </span>
        {childRoutes && childRoutes?.length > 0 && (
          <div className={styles.chevronContainer}>
            <ChevronDown className={styles.chevron} colour="black" />
            <ChevronDown className={styles.chevronWhite} />
          </div>
        )}
      </Link>

      {childRoutes && childRoutes?.length > 0 && (
        <div className={`${styles.subMenu} ${showSubMenu ? styles.active : ''}`}>
          {childRoutes?.map(({ path: childPath, name }) => (
            <Link
              key={childPath}
              to={childPath}
              onClick={() => handleLinkClick(path)}
              className={styles.childLink}
            >
              {name}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default NavLink;
