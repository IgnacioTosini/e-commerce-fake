import React from 'react';
import { StatusBadge } from '../RoleBadge/RoleBadge';
import { AiOutlineEllipsis } from "react-icons/ai";
import { HiOutlinePencil } from "react-icons/hi2";
import { FiEye } from "react-icons/fi";
import { IoTrashOutline } from "react-icons/io5";
import { Link } from 'react-router';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../../../store/store';
import { startDeletingProduct } from '../../../store/products/thunks';
import { startDeletingUser } from '../../../store/user/thunks';
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
    const dispatch = useDispatch<AppDispatch>();

    const handleDelete = () => {
        if (category === 'productos' && row.id) {
            // Confirmar antes de eliminar
            if (window.confirm('¿Estás seguro de que quieres eliminar este producto?')) {
                dispatch(startDeletingProduct(row.id as string));
            }
        }
        // Aquí puedes agregar más lógica para otras categorías como usuarios
        if (category === 'usuarios' && row.id) {
            dispatch(startDeletingUser(row.id as string));
        }
    };

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
                                    {category !== 'pedidos' && <Link to={`/admin/${category}/${row.id}/editar`}><HiOutlinePencil /> Editar</Link>}
                                    {category !== 'pedidos' && <button onClick={handleDelete}><IoTrashOutline /> Eliminar</button>}
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
