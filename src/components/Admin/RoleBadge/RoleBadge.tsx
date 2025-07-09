import React from 'react';
import './_roleBadge.scss';

type StatusBadgeProps = {
    column: string;
    value: string;
};

export const StatusBadge: React.FC<StatusBadgeProps> = ({ column, value }) => {
    let badgeClass = '';
    let displayText = value;

    if (column === 'role') {
        badgeClass = value === 'admin' ? 'role-admin' : 'role-user';
    } else if (column === 'isActive') {
        badgeClass = value === 'true' ? 'status-active' : 'status-inactive';
        displayText = value === 'true' ? 'Activo' : 'Inactivo';
    } else if (column === 'status') {
        switch (value) {
            case 'pending':
                badgeClass = 'status-pending';
                displayText = 'Pendiente';
                break;
            case 'shipped':
                badgeClass = 'status-shipped';
                displayText = 'Enviado';
                break;
            case 'delivered':
                badgeClass = 'status-delivered';
                displayText = 'Entregado';
                break;
            case 'paid':
                badgeClass = 'status-paid';
                displayText = 'Pagado';
                break;
            default:
                badgeClass = 'status-unknown';
                displayText = 'Desconocido';
        }
    }

    return <span className={`status-badge ${badgeClass}`}>{displayText}</span>;
};
