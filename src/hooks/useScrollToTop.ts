import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const scrollToTop = (): void => window.scrollTo({ top: 0, left: 0 });

const useScrollToTop = (): void => {
  const { pathname } = useLocation();

  useEffect(() => {
    scrollToTop();
  }, [pathname]);
};

export default useScrollToTop;
