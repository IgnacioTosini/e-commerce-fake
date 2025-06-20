import React from 'react';
import './_tableHeader.scss';

interface TableHeaderProps {
    columns: string[];
    columnNamesMap: { [key: string]: string };
}

export const TableHeader: React.FC<TableHeaderProps> = ({ columns, columnNamesMap }) => {
    return (
        <thead>
            <tr>
                {columns.map((col, index) => (
                    <th key={index}>{columnNamesMap[col] || col}</th>
                ))}
            </tr>
        </thead>
    );
};
