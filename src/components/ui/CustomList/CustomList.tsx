import clsx from 'clsx';
import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router';
import { animateElements } from '../../../hooks/gsapEffects';
import './_customList.scss';

type FlexOptions = {
    direction?: 'row' | 'column';
    align?: 'startAlign' | 'center' | 'endAlign';
    justify?: 'start' | 'center' | 'end' | 'space-between' | 'space-around';
    wrap?: 'wrap' | 'nowrap';
};

type CustomListProps = {
    children: React.ReactNode;
    className?: string;
    flexOptions?: FlexOptions;
    scrollable?: boolean;
    maxItems?: number;
    as: 'div' | 'ul' | 'ol';
};

export const CustomList = ({
    children,
    className = '',
    flexOptions = {},
    scrollable = false,
    maxItems,
    as,
}: CustomListProps) => {
    let content = children;
    const listRef = useRef<HTMLElement | null>(null);
    const location = useLocation();

    useEffect(() => {
        if (listRef.current) {
            const elements = Array.from(listRef.current.querySelectorAll(':scope > *'));
            animateElements(elements as HTMLElement[], 0.5, 0.2, 20);
        }
    }, [location]);

    // Si maxItems está definido y children es un array, limitamos la cantidad
    if (maxItems && Array.isArray(children)) {
        content = children.slice(0, maxItems);
    }

    const { direction = 'row', align = 'center', justify = 'center', wrap = 'nowrap' } = flexOptions;

    const classes = clsx(
        'customList',
        className,
        direction,
        align,
        justify,
        wrap,
        { scrollable }
    );

    return React.createElement(
        as,
        { ref: listRef, className: classes },
        content
    );
};
