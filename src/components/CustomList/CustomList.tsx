import './_customList.scss'

type CustomListProps = {
    children: React.ReactNode;
    className?: string;
    direction?: 'row' | 'column';
    wrap?: 'wrap' | 'nowrap';
    scrollable?: boolean;
    maxItems?: number;
};

export const CustomList = ({ children, className = '', direction = 'row', wrap = 'nowrap', scrollable = false, maxItems }: CustomListProps) => {
    let content = children;
    // Si maxItems está definido y children es un array, limitamos la cantidad
    if (maxItems && Array.isArray(children)) {
        content = children.slice(0, maxItems);
    }
    return (
        <div
            className={`customList ${className} ${direction} ${wrap} ${scrollable ? 'scrollable' : ''}`.trim()}
        >
            {content}
        </div>
    );
}
