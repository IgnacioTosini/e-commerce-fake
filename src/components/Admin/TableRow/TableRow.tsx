import React from 'react';
import { StatusBadge } from '../RoleBadge/RoleBadge';
import { AiOutlineEllipsis } from "react-icons/ai";
import { HiOutlinePencil } from "react-icons/hi2";
import { FiEye } from "react-icons/fi";
import { IoTrashOutline } from "react-icons/io5";
import { Link } from 'react-router';
import './_tableRow.scss';

interface TableRowProps {
    row: { [key: string]: string | number };
    columns: string[];
    category: string;
    activeRow: string | null;
    isMenuOpen: boolean;
    onActionClick: (rowId: string) => void;
}

export const TableRow: React.FC<TableRowProps> = ({ row, columns, category, activeRow, isMenuOpen, onActionClick }) => {
    return (
        <tr>
            {columns.map((col, colIndex) => (
                col === 'actions' ? (
                    <td key={colIndex}>
                        <div className="actionsMenu">
                            <button onClick={() => onActionClick(row.id as string)}><AiOutlineEllipsis /></button>
                            {activeRow === row.id && (
                                <div className={`actionsDropdown ${isMenuOpen ? 'open' : ''}`}>
                                    <Link to={`/admin/${category}/${row.id}`}><FiEye /> Ver</Link>
                                    <Link to={`/admin/${category}/${row.id}/editar`}><HiOutlinePencil /> Editar</Link>
                                    <button><IoTrashOutline /> Eliminar</button>
                                </div>
                            )}
                        </div>
                    </td>
                ) : (
                    <td key={colIndex}>
                        <StatusBadge column={col} value={row[col] as string} />
                    </td>
                )
            ))}
        </tr>
    );
};
