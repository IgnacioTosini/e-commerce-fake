import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router';
import { TableHeader } from '../TableHeader/TableHeader';
import { TableRow } from '../TableRow/TableRow';
import { IoMdAddCircle } from "react-icons/io";
import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '../../../store/store';
import { startLoadingProducts } from '../../../store/products/thunks';
import { startLoadUsers } from '../../../store/user/thunks';
import { DynamicListSkeleton } from './DynamicListSkeleton';
import './_dynamicList.scss';

const userColumns = ['id', 'name', 'email', 'role', 'isActive', 'actions'];
const productColumns = ['id', 'title', 'category', 'price', 'totalStock', 'isActive', 'actions'];
const orderColumns = ['id', 'userId', 'total', 'status', 'createdAt', 'actions'];

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
    totalStock: 'Inventario',
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
    const { products, isLoading } = useSelector((state: RootState) => state.products);
    const { users, loading: userLoading } = useSelector((state: RootState) => state.user);
    const { orders, loading: orderLoading } = useSelector((state: RootState) => state.orders);
    const dispatch = useDispatch<AppDispatch>();
    const isCurrentLoading =
        (category === 'productos' && isLoading) ||
        (category === 'usuarios' && userLoading) ||
        (category === 'pedidos' && orderLoading);

    // Cargar productos automáticamente cuando se monta el componente o cambia la categoría
    useEffect(() => {
        if (category === 'productos' && products.length === 0) {
            dispatch(startLoadingProducts());
        }
    }, [category, products.length, dispatch]);

    useEffect(() => {
        if (category === 'usuarios' && users.length === 0) {
            dispatch(startLoadUsers());
            console.log(users)
        }
    }, [category, users, dispatch]);

    const getTableData = (): TableConfig => {
        switch (category) {
            case 'usuarios':
                return {
                    columns: userColumns, data: users.map(({ id, name, email, role, isActive }) => ({
                        id,
                        name,
                        email,
                        role,
                        isActive: isActive ? 'true' : 'false', // Convertir booleano a string
                    }))
                };
            case 'productos':
                return {
                    columns: productColumns,
                    data: products.map(({ id, title, categoryName, price, totalStock, isActive }) => ({
                        id,
                        title,
                        category: categoryName, // Extraer el valor de 'name' como string
                        price,
                        totalStock: totalStock !== undefined ? totalStock : 0,
                        isActive: isActive ? 'true' : 'false', // Convertir booleano a string
                    })),
                };
            case 'pedidos':
                return {
                    columns: orderColumns,
                    data: orders.map(({ id, user, total, status, createdAt }) => ({
                        id,
                        userId: user.id,
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

    // Manejar diferentes estados de carga y datos vacíos
    const shouldShowEmpty = data.length === 0 && !isLoading;

    if (shouldShowEmpty) {
        return (
            <div className="dynamicListSection">
                <h1 className='dynamicListTitle'>{category ? category.charAt(0).toUpperCase() + category.slice(1) : 'Lista'}</h1>
                <p className='dynamicListEmpty'>No hay datos disponibles para mostrar.</p>
            </div>
        );
    }

    const handleActionClick = (rowId: string) => {
        setActiveRow(activeRow === rowId ? null : rowId);
        setIsMenuOpen(activeRow !== rowId);
    };

    if (isCurrentLoading) {
        return <div className="dynamicListSection"><DynamicListSkeleton category={category} /></div>;
    }

    return (
        <section className="dynamicListSection">
            {category === 'productos' && (
                <Link to={`/admin/productos/nuevo`} className='addButton'><IoMdAddCircle />Agregar Producto</Link>
            )}
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
        </section>
    );
};

export default DynamicList;
