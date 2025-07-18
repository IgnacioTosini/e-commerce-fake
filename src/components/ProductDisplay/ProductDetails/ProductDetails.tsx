import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router'
import type { Product } from '../../../types'
import { Badge } from '../../ui/Badge/Badge'
import { ColorList } from '../../Filters/ColorList/ColorList'
import { Counter } from '../../ui/Counter/Counter'
import { CustomButton } from '../../ui/CustomButton/CustomButton'
import { GalleryProduct } from '../GalleryProduct/GalleryProduct'
import { Modal } from '../../ui/Modal/Modal';
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
import { useProductVariantSelector } from '../../../hooks/useProductVariantSelector'
import { ProductReviews } from '../../ui/ProductReviews/ProductReviews'
import './_productDetails.scss'

type ProductDetailsProps = {
    product: Product
}

export const ProductDetails = ({ product }: ProductDetailsProps) => {
    const {
        selectedColor,
        selectedSize,
        setSelectedColor,
        setSelectedSize,
        availableSizesForColor,
        availableColorsForSize,
        currentVariantStock,
        handleColorSelect,
        handleSizeSelect,
    } = useProductVariantSelector(product);
    const dispatch = useDispatch<AppDispatch>();
    const { uid } = useSelector((state: RootState) => state.auth);
    const { products } = useSelector((state: RootState) => state.products);
    const { favorites } = useSelector((state: RootState) => state.user);
    const [quantity, setQuantity] = useState(1);
    const [randomProducts, setRandomProducts] = useState<Product[]>(
        [...products].sort(() => Math.random() - 0.5).slice(0, 4)
    );
    const [resetSelection, setResetSelection] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [mainImage, setMainImage] = useState<string>(product.images[0].url);
    const productDetailsContainerRef = useRef<HTMLDivElement | null>(null);
    const location = useLocation();
    // Verificar si el producto está en favoritos
    const isProductInFavorites = favorites.includes(product.id);

    useEffect(() => {
        setMainImage(product.images[0].url);
    }, [product.images]);

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

        if (currentVariantStock < quantity) {
            toast.error(`No hay suficiente stock para esta combinación de color y talla, solo quedan ${currentVariantStock} unidades`);
            return;
        }

        dispatch(startAddToCart(uid, product, quantity, selectedSize, selectedColor));
        toast.success(
            <ToastNotification
                image={product.images.map(image => image.url)[0]}
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
                        image={product.images.map(image => image.url)[0]}
                        message="Producto eliminado de favoritos"
                        altText={product.title}
                    />
                );
            } else {
                // Agregar a favoritos
                await dispatch(startAddFavorite(uid, product.id));
                toast.success(
                    <ToastNotification
                        image={product.images.map(image => image.url)[0]}
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
                <GalleryProduct
                    images={product.images.map(image => image.url)}
                    mainImage={mainImage}
                    setMainImage={setMainImage}
                    onMainImageClick={() => setIsModalOpen(true)}
                />
                <section className='productDetails'>
                    <section className='productDetailsInfo'>
                        <h2 className='productDetailsTitle'>{product.title}</h2>
                        <div className='productDetailsRating'>
                            <RatingStars rating={product.rating} />
                            <p className='productDetailRating'>{product.rating}</p>
                        </div>
                        {product.discount! > 0 && (
                            <section className='productDetailsDiscount'>
                                <ProductPrice product={product} />
                                {
                                    product.discount &&
                                    <Badge color='info'>{product.discount}% OFF</Badge>
                                }
                            </section>
                        )}
                    </section>
                    <section className='productDetailsActions'>
                        <h3>Color</h3>
                        <ColorList
                            // Si hay una talla seleccionada, mostrar solo colores disponibles para esa talla
                            colors={selectedSize
                                ? availableColorsForSize[selectedSize] || []
                                : Array.from(new Set(product.variants.filter(v => v.stock > 0).map(v => v.color)))}
                            onColorSelect={handleColorSelect}
                            resetSelection={resetSelection}
                        />
                        <h3>Talla</h3>
                        <SizeList
                            // Si hay un color seleccionado, mostrar solo tallas disponibles para ese color
                            sizes={selectedColor
                                ? availableSizesForColor[selectedColor] || []
                                : Array.from(new Set(product.variants.filter(v => v.stock > 0).map(v => v.size)))}
                            onSizeSelect={handleSizeSelect}
                            resetSelection={resetSelection}
                        />
                        <h3>Cantidad</h3>
                        <Counter stock={currentVariantStock} onChange={setQuantity} resetSelection={resetSelection} />
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
            <ProductReviews productId={product.id} />
            <h2 className='relatedProductsTitle'>También te puede interesar</h2>
            <CustomList flexOptions={{ direction: 'row', wrap: 'wrap' }} as='div' maxItems={4}>
                {randomProducts.map((product, idx) => (
                    <ProductCard key={product.id || idx} product={product} onClick={updateRandomProducts} />
                ))}
            </CustomList>
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                mainImage={mainImage}
                setMainImage={setMainImage}
                images={product.images.map(image => image.url)}
            />
        </>
    )
}