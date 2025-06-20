import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { useEffect } from 'react';

/**
 * Efecto de fade-in y subida con GSAP para un solo elemento.
 * @param element - Elemento HTML a animar
 * @param delay - Delay opcional para la animación
 */
export function fadeInUp(element: HTMLElement, delay = 0) {
    gsap.fromTo(
        element,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.7, delay, ease: 'power3.out' }
    );
}

/**
 * Efecto de fade-in y subida con GSAP para un array de elementos.
 * @param elements - Array de elementos HTML a animar
 * @param delayStart - Delay inicial
 * @param delayStep - Paso de delay entre elementos
 */
export function fadeInUpArray(elements: HTMLElement[], delayStart = 0, delayStep = 0.15) {
    elements.forEach((element, i) => {
        gsap.fromTo(
            element,
            { opacity: 0, y: 40 },
            { opacity: 1, y: 0, duration: 0.6, delay: delayStart + i * delayStep, ease: 'power3.out' }
        );
    });
}

/**
 * Animación genérica para múltiples elementos con aparición escalonada.
 * @param elements - Array de elementos HTML a animar
 * @param delayStart - Delay inicial para la animación
 * @param stagger - Tiempo de escalonamiento entre elementos
 * @param yOffset - Desplazamiento vertical inicial
 */
export function animateElements(
    elements: HTMLElement[],
    delayStart = 0,
    stagger = 0.2,
    yOffset = 20
) {
    gsap.fromTo(
        elements,
        { opacity: 0, y: yOffset },
        {
            opacity: 1,
            y: 0,
            delay: delayStart,
            duration: 0.7,
            ease: 'power3.out',
            stagger,
            scrollTrigger: {
                trigger: elements[0], // Usa el primer elemento como referencia para el scroll
            },
        }
    );
}

/**
 * Animación para elementos con GSAP que se activan al hacer scroll.
 * @param element - Elemento HTML a animar
 * @param yOffset - Desplazamiento vertical inicial
 * @param delay - Delay opcional para la animación
 */
export function animateOnScroll(element: HTMLElement, yOffset = 40, delay = 0) {
    gsap.fromTo(
        element,
        { opacity: 0, y: yOffset },
        {
            opacity: 1,
            y: 0,
            duration: 0.7,
            delay,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: element,
                start: 'center bottom',
            },
        }
    );
}

export const useMenuAnimation = (isMenuOpen: boolean, menuRef: React.RefObject<HTMLDivElement | null>) => {
    useEffect(() => {
        if (menuRef.current) {
            const timeline = gsap.timeline();

            if (isMenuOpen) {
                timeline
                    .set(menuRef.current, { display: 'block' })
                    .fromTo(menuRef.current, { height: 0 }, { height: 'auto', duration: 0.5, ease: 'power.out' });

            } else {
                timeline
                    .to(menuRef.current, { height: 0, duration: 0.5, ease: 'power.out' })
                    .set(menuRef.current, { display: 'none' });
            }
        }
    }, [isMenuOpen, menuRef]);
};

gsap.registerPlugin(ScrollTrigger);
