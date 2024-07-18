import { useEffect } from 'react';

const scrollToTop = (): void => window.scrollTo({ top: 0, left: 0 });

const useScrollToTop = (): void => {
  useEffect(() => {
    scrollToTop();
  }, []);
};

export default useScrollToTop;
