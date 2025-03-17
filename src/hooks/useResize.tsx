import { useState, useEffect } from 'react';
import { SCREEN_XS, SCREEN_S, SCREEN_M, SCREEN_L, SCREEN_XL } from '../constants/breakpoints';

export const useResize = () => {
  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);

  useEffect(() => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);

    const handleResize = () => {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return {
    width,
    height,
    isScreenXS: width >= SCREEN_XS,
    isScreenS: width >= SCREEN_S,
    isScreenM: width >= SCREEN_M,
    isScreenL: width >= SCREEN_L,
    isScreenXl: width >= SCREEN_XL,
  };
};