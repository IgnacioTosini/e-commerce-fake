import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Animación para la lista de categorías en la HomePage.
 * @param element - Elemento HTML a animar
 */
export function animateCategoriesList(element: HTMLElement) {
    gsap.fromTo(
        element,
        { opacity: 0, y: 40 },
        {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: element,
                start: 'top 80%',
            },
        }
    );
}

/**
 * Animación para la lista personalizada en la HomePage.
 * @param element - Elemento HTML a animar
 */
export function animateCustomList(element: HTMLElement) {
    gsap.fromTo(
        element,
        { opacity: 0, y: 40 },
        {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: element,
                start: 'top 80%',
            },
        }
    );
}
