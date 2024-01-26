import { FC, useState } from 'react';
import { NavLinkProps } from '@/types/props';
import styles from './NavLink.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import ChevronDown from '@/assets/navigation/ChevronDown';
import Paths from '@/config/paths';

const NavLink: FC<NavLinkProps> = ({ name, path, childRoutes, onLinkClicked }) => {
  const [showSubMenu, setShowSubMenu] = useState(false);

  const navigate = useNavigate();

  const handleClick = (e: React.MouseEvent<HTMLElement>, path: string): void => {
    e.preventDefault();

    if (childRoutes && childRoutes?.length > 0) {
      setShowSubMenu(!showSubMenu);
    } else {
      handleLinkClick(path);
    }
  };

  const handleLinkClick = (path: string): void => {
    if (onLinkClicked) {
      onLinkClicked();
    }

    navigate(path);
  };

  if (!name) {
    return;
  }

  return (
    <div
      className={`${styles.linkContainer} ${path === Paths.LOGIN ? styles.loginLink : ''}`}
      key={name}
    >
      <Link
        className={`${styles.link} ${path === Paths.LOGIN ? styles.accentLink : ''}`}
        onClick={(e) => handleClick(e, path)}
        to={path}
      >
        <span>{name}</span>
        {childRoutes && childRoutes?.length > 0 && (
          <div className={styles.chevronContainer}>
            <ChevronDown className={styles.chevron} colour="black" />
            <ChevronDown className={styles.chevronWhite} />
          </div>
        )}
      </Link>

      {childRoutes && childRoutes?.length > 0 && (
        <div className={`${styles.subMenu} ${showSubMenu ? styles.active : ''}`}>
          {childRoutes?.map((childRoute) => (
            <Link
              key={childRoute.path}
              to={childRoute.path}
              onClick={() => handleLinkClick(path)}
              className={styles.childLink}
            >
              {childRoute.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default NavLink;
