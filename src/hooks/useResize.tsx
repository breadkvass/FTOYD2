import { useState, useEffect } from 'react';
import { SCREEN_S, SCREEN_M, SCREEN_L, SCREEN_XL } from '../constants/breakpoints';

export const useResize = () => {
  const [width, setWidth] = useState<number>(window.innerWidth);

  useEffect(() => {
    const handleResize = (event: UIEvent) => {
      const target = event.target as Window;
      setWidth(target.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return {
    width,
    isScreenS: width >= SCREEN_S,
    isScreenM: width >= SCREEN_M,
    isScreenL: width >= SCREEN_L,
    isScreenXl: width >= SCREEN_XL,
  };
};