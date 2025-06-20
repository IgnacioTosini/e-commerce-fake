import { useState } from 'react';
import { useParams } from 'react-router';
import { mockProducts } from '../../../utils/mockProducts';
import { mockOrders } from '../../../utils/mockOrders';
import { TableHeader } from '../TableHeader/TableHeader';
import { TableRow } from '../TableRow/TableRow';
import './_dynamicList.scss';

const userColumns = ['id', 'name', 'email', 'role', 'isActive', 'actions'];
const productColumns = ['id', 'title', 'category', 'price', 'stock', 'isActive', 'actions'];
const orderColumns = ['id', 'userId', 'total', 'status', 'createdAt', 'actions'];

const mockUsers = [
    { id: '1', name: 'Juan Pérez', email: 'juan@example.com', role: 'Usuario', isActive: 'true' },
    { id: '2', name: 'Ana López', email: 'ana@example.com', role: 'Admin', isActive: 'false' },
];

type TableData = {
    [key: string]: string | number;
};

type TableConfig = {
    columns: string[];
    data: TableData[];
};

const columnNamesMap: { [key: string]: string } = {
    id: 'ID',
    name: 'Nombre',
    email: 'Correo Electrónico',
    role: 'Rol',
    isActive: 'Estado',
    title: 'Título',
    category: 'Categoría',
    price: 'Precio',
    stock: 'Inventario',
    status: 'Estado',
    createdAt: 'Fecha de Creación',
    userId: 'ID Usuario',
    total: 'Total',
    actions: 'Acciones'
};

export const DynamicList = () => {
    const { category } = useParams();
    const [activeRow, setActiveRow] = useState<string | null>(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const getTableData = (): TableConfig => {
        switch (category) {
            case 'usuarios':
                return { columns: userColumns, data: mockUsers };
            case 'productos':
                return {
                    columns: productColumns,
                    data: mockProducts.map(({ id, title, categoryName, price, stock, isActive }) => ({
                        id,
                        title,
                        category: categoryName.name, // Extraer el valor de 'name' como string
                        price,
                        stock,
                        isActive: isActive ? 'true' : 'false', // Convertir booleano a string
                    })),
                };
            case 'pedidos':
                return {
                    columns: orderColumns,
                    data: mockOrders.map(({ id, userId, total, status, createdAt }) => ({
                        id,
                        userId,
                        total,
                        status,
                        createdAt,
                    })),
                };
            default:
                return { columns: [], data: [] };
        }
    };

    const { columns, data } = getTableData();
    if (data.length === 0) {
        return <p className='dynamicListEmpty'>No hay datos disponibles para mostrar.</p>;
    }

    const handleActionClick = (rowId: string) => {
        setActiveRow(activeRow === rowId ? null : rowId);
        setIsMenuOpen(activeRow !== rowId);
    };

    return (
        <div className="dynamicList">
            <h1 className='dynamicListTitle'>{category ? category.charAt(0).toUpperCase() + category.slice(1) : 'Lista'}</h1>
            <p className='dynamicListCount'>Total de {data.length} elementos</p>
            <table className="dynamicTable">
                <TableHeader columns={columns} columnNamesMap={columnNamesMap} />
                <tbody>
                    {data.map((row, rowIndex) => (
                        <TableRow
                            key={rowIndex}
                            row={row}
                            columns={columns}
                            category={category || ''}
                            activeRow={activeRow}
                            isMenuOpen={isMenuOpen}
                            onActionClick={handleActionClick}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
};
