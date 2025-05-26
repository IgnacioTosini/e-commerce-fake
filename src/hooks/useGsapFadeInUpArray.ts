import { useEffect } from 'react';
import gsap from 'gsap';

/**
 * Hook para animar un array de refs con fade-in y subida.
 * @param refs - Array de refs de elementos a animar
 * @param delayStart - Delay inicial
 * @param delayStep - Paso de delay entre elementos
 */
export function useGsapFadeInUpArray(refs: Array<React.RefObject<HTMLElement | null>>, delayStart = 0, delayStep = 0.15) {
    useEffect(() => {
        refs.forEach((ref, i) => {
            if (ref.current) {
                gsap.fromTo(
                    ref.current,
                    { opacity: 0, y: 40 },
                    { opacity: 1, y: 0, duration: 0.6, delay: delayStart + i * delayStep, ease: 'power3.out' }
                );
            }
        });
    }, [refs, delayStart, delayStep]);
}
