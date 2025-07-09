import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router'
import type { Product } from '../../../types'
import { Badge } from '../../ui/Badge/Badge'
import { ColorList } from '../../Filters/ColorList/ColorList'
import { Counter } from '../../ui/Counter/Counter'
import { CustomButton } from '../../ui/CustomButton/CustomButton'
import { GalleryProduct } from '../GalleryProduct/GalleryProduct'
import { ProductCard } from '../ProductCard/ProductCard'
import { RatingStars } from '../RatingStars/RatingStars'
import { SizeList } from '../../Filters/SizeList/SizeList'
import { toast } from 'react-toastify'
import { ToastNotification } from '../../ui/ToastNotification/ToastNotification';
import { animateElements } from '../../../hooks/gsapEffects'
import { ProductPrice } from '../ProductPrice/ProductPrice'
import { CustomList } from '../../ui/CustomList/CustomList'
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from '../../../store/store'
import { startAddToCart } from '../../../store/cart/thunks'
import { startAddFavorite, startRemoveFavorite } from '../../../store/user/thunks'
import './_productDetails.scss'

type ProductDetailsProps = {
    product: Product
}

export const ProductDetails = ({ product }: ProductDetailsProps) => {
    const dispatch = useDispatch<AppDispatch>();
    const { uid } = useSelector((state: RootState) => state.auth);
    const { products } = useSelector((state: RootState) => state.products);
    const { favorites } = useSelector((state: RootState) => state.user);
    const [selectedColor, setSelectedColor] = useState<string | null>(null);
    const [selectedSize, setSelectedSize] = useState<string | null>(null);
    const [quantity, setQuantity] = useState(1);
    const [randomProducts, setRandomProducts] = useState<Product[]>(
        [...products].sort(() => Math.random() - 0.5).slice(0, 4)
    );
    const [resetSelection, setResetSelection] = useState(false);
    const productDetailsContainerRef = useRef<HTMLDivElement | null>(null);
    const location = useLocation();

    // Verificar si el producto está en favoritos
    const isProductInFavorites = favorites.includes(product.id);

    useEffect(() => {
        if (productDetailsContainerRef.current) {
            const elements = Array.from(productDetailsContainerRef.current.querySelectorAll('.productDetailsContainerRef, .galleryProduct, .productDetails, .productDetailsInfo, .productDetailsActions > *'));
            animateElements(elements as HTMLElement[], 0.5, 0.2, 30);
        }
    }, [location]);

    const updateRandomProducts = () => {
        setRandomProducts([...products].sort(() => Math.random() - 0.5).slice(0, 4));
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
        if (!uid) {
            toast.error('Debes iniciar sesión para agregar productos al carrito');
            return;
        }

        dispatch(startAddToCart(uid, product, quantity, selectedSize, selectedColor));
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
        setResetSelection(true);
        setTimeout(() => setResetSelection(false), 0);
    };

    const handleToggleFavorites = async () => {
        if (!uid) {
            toast.error('Debes iniciar sesión para gestionar favoritos');
            return;
        }

        try {
            if (isProductInFavorites) {
                // Eliminar de favoritos
                await dispatch(startRemoveFavorite(uid, product.id));
                toast.success(
                    <ToastNotification
                        image={product.images[0]}
                        message="Producto eliminado de favoritos"
                        altText={product.title}
                    />
                );
            } else {
                // Agregar a favoritos
                await dispatch(startAddFavorite(uid, product.id));
                toast.success(
                    <ToastNotification
                        image={product.images[0]}
                        message="Producto añadido a favoritos"
                        altText={product.title}
                    />
                );
            }
        } catch {
            toast.error('Error al actualizar favoritos');
        }
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
                            <CustomButton color='primary' icon='cart' onClick={handleAddToCart}>
                                Agregar al carrito
                            </CustomButton>
                            <CustomButton
                                color={isProductInFavorites ? 'danger' : 'tertiary'}
                                icon={isProductInFavorites ? 'heartFilled' : 'heart'}
                                onClick={handleToggleFavorites}
                            >
                                {isProductInFavorites ? 'Eliminar de favoritos' : 'Añadir a favoritos'}
                            </CustomButton>
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