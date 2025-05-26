import { useEffect } from 'react';
import gsap from 'gsap';

/**
 * Hook para animación de entrada fade-in y subida con gsap.
 * @param ref - Ref del elemento a animar
 * @param delay - Delay opcional para la animación
 */
export function useGsapFadeInUp(ref: React.RefObject<HTMLElement | null>, delay = 0) {
    useEffect(() => {
        if (ref.current) {
            gsap.fromTo(
                ref.current,
                { opacity: 0, y: 40 },
                { opacity: 1, y: 0, duration: 0.7, delay, ease: 'power3.out' }
            );
        }
    }, [ref, delay]);
}
