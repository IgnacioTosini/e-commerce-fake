import React from 'react';
import './_badge.scss';

interface BadgeProps {
    children: React.ReactNode;
    color?: 'primary' | 'success' | 'danger' | 'warning' | 'info';
}

export const Badge: React.FC<BadgeProps> = ({ children, color = 'primary' }) => {
    return (
        <span className={`badge badge--${color}`}>
            {children}
        </span>
    );
};
