import { useEffect, useState } from 'react';
import './_counter.scss';

type CounterProps = {
    prevCant?: number;
    stock: number;
    onChange: (quantity: number) => void;
    resetSelection?: boolean;
};

export const Counter = ({prevCant, stock, onChange, resetSelection }: CounterProps) => {
    const [cant, setCant] = useState(prevCant || 1);

    useEffect(() => {
        if (resetSelection) {
            setCant(1);
        }
    }, [resetSelection]);

    const handleDecrement = () => {
        if (cant > 1) {
            setCant(cant - 1);
            onChange(cant - 1);
        }
    };

    const handleIncrement = () => {
        if (cant < stock) {
            setCant(cant + 1);
            onChange(cant + 1);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value, 10);
        if (!isNaN(value) && value >= 1 && value <= stock) {
            setCant(value);
            onChange(value);
        }
    };

    return (
        <div className='counter'>
            <button className='counterButton left' onClick={handleDecrement}>-</button>
            <input className='counterValue' value={cant} onChange={handleChange} />
            <button className='counterButton right' onClick={handleIncrement}>+</button>
        </div>
    )
}
