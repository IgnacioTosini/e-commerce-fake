import { useNavigate, useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form } from 'formik';
import { PriceStockCard } from '../../components/Admin/Custom/PriceStockCard/PriceStockCard';
import { HeaderCustomActions } from '../../components/Admin/Custom/HeaderCustomActions/HeaderCustomActions';
import { InformationCustomCard } from '../../components/Admin/Custom/InformationCustomCard/InformationCustomCard';
import { VariantInformationCard } from '../../components/Admin/Custom/VariantInformationCard/VariantInformationCard';
import { ImagesInformationCard } from '../../components/Admin/Custom/ImagesInformationCard/ImagesInformationCard';
import type { AppDispatch, RootState } from '../../store/store';
import { productCreateSchema } from '../../schemas/productFormSchemas';
import { startUpdateProduct } from '../../store/products/thunks';
import type { ProductImage, ProductVariant } from '../../types';
import './_productEditPage.scss'
import { useEffect, useState } from 'react';

// Valores iniciales adaptados al nuevo tipo Product
const initialValues = {
    title: '',
    description: '',
    brand: '',
    categoryName: '',
    price: 0,
    discount: 0,
    variants: [] as ProductVariant[],
    images: [] as ProductImage[],
};

export const ProductEditPage = () => {
    const { id } = useParams<{ id: string }>();
    const { products, isLoading } = useSelector((state: RootState) => state.products);
    const product = products.find(product => product.id === id);
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const [originalImages, setOriginalImages] = useState<ProductImage[]>([]);

    useEffect(() => {
        if (product && product.images) {
            setOriginalImages(product.images);
        }
    }, [product]);

    // Mapear los valores del producto a los nombres de campos del formulario
    const mappedInitialValues = product ? {
        title: product.title || '',
        description: product.description || '',
        brand: product.brand || '',
        categoryName: product.categoryName || '',
        price: product.price || 0,
        discount: product.discount || 0,
        variants: product.variants || [],
        images: product.images || [],
    } : initialValues;

    const handleSubmit = async (values: typeof initialValues) => {
        // Generar IDs únicos para variantes si no existen
        const variantsWithId = (values.variants || []).map(variant => ({
            ...variant,
            id: variant.id || `${product?.id || 'new'}-${variant.color}-${variant.size}`
        }));

        const productData = {
            id: product?.id || '',
            title: values.title,
            description: values.description,
            brand: values.brand,
            categoryName: values.categoryName,
            price: values.price,
            variants: variantsWithId,
            discount: values.discount,
            images: values.images,
            rating: product?.rating || 0,
            createdAt: product?.createdAt || '',
            updatedAt: product?.updatedAt || ''
        };
        console.log('Product data to update:', productData);

        // Esperar a que la acción termine antes de navegar
        await dispatch(startUpdateProduct(productData, product?.id || '', originalImages));
        // Navegar solo si no está cargando y hay producto
        if (!isLoading && productData.id) {
            navigate('/admin/productos');
        }
    };
    return (
        <div className='productEditPage'>
            <Formik
                initialValues={mappedInitialValues}
                validationSchema={productCreateSchema}
                onSubmit={handleSubmit}
                enableReinitialize={true}
            >
                <Form>
                    <HeaderCustomActions
                        type='product'
                        mode='edit'
                    />
                    <div className='productEditPageContent'>
                        <InformationCustomCard
                            mode='edit'
                        />
                        <VariantInformationCard
                            mode='edit'
                        />
                        <PriceStockCard
                            mode='edit'
                        />
                        <ImagesInformationCard
                            mode='edit'
                        />
                    </div>
                </Form>
            </Formik>
        </div>
    )
}

export default ProductEditPage;