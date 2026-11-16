'use client';
import { useEffect, useState } from 'react';
export const useIsMobile = () => {
    const [isMobile, setIsMobile] = useState(false);
    useEffect(() => {
        const mediaQuery = window.matchMedia('(max-width: 768px)');
        const handleChange = (event) => setIsMobile(event.matches);
        setIsMobile(mediaQuery.matches);
        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
    }, []);
    return isMobile;
};
