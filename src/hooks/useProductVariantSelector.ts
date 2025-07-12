import { useState, useEffect } from 'react';
import type { Product } from '../types';

export function useProductVariantSelector(product: Product) {
    const [selectedColor, setSelectedColor] = useState<string | null>(null);
    const [selectedSize, setSelectedSize] = useState<string | null>(null);
    const [availableSizesForColor, setAvailableSizesForColor] = useState<Record<string, string[]>>({});
    const [availableColorsForSize, setAvailableColorsForSize] = useState<Record<string, string[]>>({});
    const [stockByVariant, setStockByVariant] = useState<Record<string, number>>({});

    useEffect(() => {
        const sizesForColor: Record<string, string[]> = {};
        const colorsForSize: Record<string, string[]> = {};
        const stockMap: Record<string, number> = {};

        product.variants.forEach(variant => {
            if (variant.stock <= 0) return;
            if (!sizesForColor[variant.color]) sizesForColor[variant.color] = [];
            if (!sizesForColor[variant.color].includes(variant.size)) sizesForColor[variant.color].push(variant.size);

            if (!colorsForSize[variant.size]) colorsForSize[variant.size] = [];
            if (!colorsForSize[variant.size].includes(variant.color)) colorsForSize[variant.size].push(variant.color);

            stockMap[`${variant.color}-${variant.size}`] = variant.stock;
        });

        setAvailableSizesForColor(sizesForColor);
        setAvailableColorsForSize(colorsForSize);
        setStockByVariant(stockMap);
    }, [product]);

    const currentVariantStock = (selectedColor && selectedSize)
        ? stockByVariant[`${selectedColor}-${selectedSize}`] || 0
        : 0;

    const handleColorSelect = (color: string) => {
        setSelectedColor(prev => {
            if (prev === color) return null;
            // Reset talla si no es válida para el nuevo color
            if (selectedSize && !availableSizesForColor[color]?.includes(selectedSize)) setSelectedSize(null);
            return color;
        });
    };

    const handleSizeSelect = (size: string) => {
        setSelectedSize(prev => {
            if (prev === size) return null;
            // Reset color si no es válido para la nueva talla
            if (selectedColor && !availableColorsForSize[size]?.includes(selectedColor)) setSelectedColor(null);
            return size;
        });
    };

    return {
        selectedColor,
        selectedSize,
        setSelectedColor,
        setSelectedSize,
        availableSizesForColor,
        availableColorsForSize,
        stockByVariant,
        currentVariantStock,
        handleColorSelect,
        handleSizeSelect,
    };
}