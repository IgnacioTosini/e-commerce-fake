import { Formik, Form } from 'formik';
import { useNavigate } from 'react-router';
import { PriceStockCard } from '../../components/Admin/Custom/PriceStockCard/PriceStockCard';
import { HeaderCustomActions } from '../../components/Admin/Custom/HeaderCustomActions/HeaderCustomActions';
import { InformationCustomCard } from '../../components/Admin/Custom/InformationCustomCard/InformationCustomCard';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../../store/store';
import { startNewProduct } from '../../store/products/thunks';
import { VariantInformationCard } from '../../components/Admin/Custom/VariantInformationCard/VariantInformationCard';
import { productCreateSchema } from '../../schemas/productFormSchemas';
import { ImagesInformationCard } from '../../components/Admin/Custom/ImagesInformationCard/ImagesInformationCard';
import type { ProductImage, ProductVariant } from '../../types';
import './_productNewPage.scss'

// Valores iniciales Product
const initialValues = {
    title: '',
    description: '',
    brand: '',
    categoryName: '',
    price: 0,
    discount: 0,
    variants: [] as ProductVariant[],
    colors: [] as string[],
    sizes: [] as string[],
    images: [] as ProductImage[],
};

export const ProductNewPage = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const handleSubmit = async (values: typeof initialValues) => {
        // Generar IDs únicos para variantes si no existen
        const variantsWithId = (values.variants || []).map(variant => ({
            ...variant,
            id: variant.id || `new-${variant.color}-${variant.size}`
        }));

        const productData = {
            title: values.title,
            description: values.description,
            brand: values.brand,
            categoryName: values.categoryName,
            price: values.price,
            discount: values.discount,
            variants: variantsWithId,
            colors: values.colors,
            sizes: values.sizes,
            images: values.images,
        };

        // Esperar a que la acción termine antes de navegar
        await dispatch(startNewProduct(productData));
        // Navegar solo si el producto tiene variantes y título
        if (productData && productData.variants.length > 0 && productData.title) {
            navigate('/admin/productos');
        }
    };

    return (
        <div className='productNewPage'>
            <Formik
                initialValues={initialValues}
                validationSchema={productCreateSchema}
                onSubmit={handleSubmit}
            >
                <Form>
                    <HeaderCustomActions
                        type='product'
                        mode='create'
                    />
                    <div className='productNewPageContent'>
                        <InformationCustomCard
                            mode='create'
                        />
                        <VariantInformationCard
                            mode='create'
                        />
                        <PriceStockCard
                            mode='create'
                        />
                        <ImagesInformationCard
                            mode='create'
                        />
                    </div>
                </Form>
            </Formik>
        </div>
    )
}