import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToHash({ children }: { children: React.ReactNode }) {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return <>{children}</>;
}
