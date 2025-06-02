import { useEffect, useRef, useState } from 'react'
import type { Product } from '../../types'
import { mockProducts } from '../../utils/mockProducts'
import { Badge } from '../Badge/Badge'
import { ColorList } from '../ColorList/ColorList'
import { Counter } from '../Counter/Counter'
import { CustomButton } from '../CustomButton/CustomButton'
import { CustomList } from '../CustomList/CustomList'
import { GalleryProduct } from '../GalleryProduct/GalleryProduct'
import { ProductCard } from '../ProductCard/ProductCard'
import { ProductPrice } from '../ProductPrice/ProductPrice'
import { RatingStars } from '../RatingStars/RatingStars'
import { SizeList } from '../SizeList/SizeList'
import { useCart } from '../../context/useCart'
import './_productDetails.scss'
import { toast } from 'react-toastify'
import { ToastNotification } from '../ToastNotification/ToastNotification';
import { useLocation } from 'react-router'
import { animateElements } from '../../hooks/gsapEffects'

type ProductDetailsProps = {
    product: Product
}

export const ProductDetails = ({ product }: ProductDetailsProps) => {
    const { addToCart } = useCart();
    const [selectedColor, setSelectedColor] = useState<string | null>(null);
    const [selectedSize, setSelectedSize] = useState<string | null>(null);
    const [quantity, setQuantity] = useState(1);
    const [randomProducts, setRandomProducts] = useState<Product[]>(
        mockProducts.sort(() => Math.random() - 0.5).slice(0, 4)
    );
    const [resetSelection, setResetSelection] = useState(false);
    const productDetailsContainerRef = useRef<HTMLDivElement | null>(null);
    const location = useLocation();

    useEffect(() => {
        if (productDetailsContainerRef.current) {
            const elements = Array.from(productDetailsContainerRef.current.querySelectorAll('.productDetailsContainerRef, .galleryProduct, .productDetails, .productDetailsInfo, .productDetailsActions > *'));
            animateElements(elements as HTMLElement[], 0.5, 0.2, 30);
        }
    }, [location]);

    const updateRandomProducts = () => {
        setRandomProducts(mockProducts.sort(() => Math.random() - 0.5).slice(0, 4));
    };

    const handleAddToCart = () => {
        if (!selectedColor) {
            toast.error('Por favor selecciona un color');
            return;
        }
        if (!selectedSize) {
            toast.error('Por favor selecciona una talla');
            return;
        }
        addToCart({ ...product, color: selectedColor, size: selectedSize, quantity });
        toast.success(
            <ToastNotification
                image={product.images[0]}
                message="Producto agregado al carrito"
                altText={product.title}
            />
        );
        setSelectedColor(null);
        setSelectedSize(null);
        setQuantity(1);
        setResetSelection(true); // Restablecer selección de color
        setTimeout(() => setResetSelection(false), 0); // Reiniciar el estado
    };

    return (
        <>
            <div className='productDetailsContainer' ref={productDetailsContainerRef}>
                <GalleryProduct images={product.images} />
                <section className='productDetails'>
                    <section className='productDetailsInfo'>
                        <h2 className='productDetailsTitle'>{product.title}</h2>
                        <div className='productDetailsRating'>
                            <RatingStars rating={product.rating} />
                            <p className='productDetailRating'>{product.rating}</p>
                        </div>
                        <section className='productDetailsDiscount'>
                            <ProductPrice product={product} />
                            {
                                product.discount &&
                                <Badge color='info'>{product.discount}% OFF</Badge>
                            }
                        </section>
                    </section>
                    <section className='productDetailsActions'>
                        <h3>Color</h3>
                        <ColorList colors={product.colors} onColorSelect={setSelectedColor} resetSelection={resetSelection} />
                        <h3>Talla</h3>
                        <SizeList sizes={product.sizes} onSizeSelect={setSelectedSize} resetSelection={resetSelection} />
                        <h3>Cantidad</h3>
                        <Counter stock={product.stock} onChange={setQuantity} resetSelection={resetSelection} />
                        <section className='productDetailsButtons'>
                            <CustomButton color='primary' icon='cart' onClick={handleAddToCart}>Agregar al carrito</CustomButton>
                            <CustomButton color='secondary' icon='heart'>Añadir a favoritos</CustomButton>
                        </section>
                    </section>
                    <h3>Descripción</h3>
                    <p className='productDetailsDescription'>{product.description}</p>
                </section>
            </div>
            <h2 className='relatedProductsTitle'>También te puede interesar</h2>
            <CustomList flexOptions={{ direction: 'row', wrap: 'wrap' }} as='div' maxItems={4}>
                {randomProducts.map((product, idx) => (
                    <ProductCard key={product.id || idx} product={product} onClick={updateRandomProducts} />
                ))}
            </CustomList>
        </>
    )
}
