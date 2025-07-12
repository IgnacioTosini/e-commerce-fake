
import React from 'react';
import './_dynamicListSkeleton.scss';

const skeletonRows = 6;

const getColumns = (category: string | undefined): string[] => {
    switch (category) {
        case 'usuarios':
            return ['id', 'name', 'email', 'role', 'isActive', 'actions'];
        case 'productos':
            return ['id', 'title', 'category', 'price', 'totalStock', 'isActive', 'actions'];
        case 'pedidos':
            return ['id', 'userId', 'total', 'status', 'createdAt', 'actions'];
        default:
            return [];
    }
};

export const DynamicListSkeleton: React.FC<{ category?: string }> = ({ category }) => {
    const columns = getColumns(category);
    return (
        <section className="dynamicListSection">
            <div className="dynamicList">
                {/* Título y contador skeleton */}
                <h1 className="dynamicListTitle skeleton-title" />
                <p className="dynamicListCount skeleton-count" />
                <table className="dynamicTable">
                    <thead>
                        <tr>
                            {columns.map((col, idx) => (
                                <th key={col + idx}>
                                    <div className="skeleton-th" />
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {Array.from({ length: skeletonRows }).map((_, rowIdx) => (
                            <tr key={rowIdx}>
                                {columns.map((col, colIdx) => (
                                    <td key={col + colIdx}>
                                        <div className="skeleton-td" />
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
};
