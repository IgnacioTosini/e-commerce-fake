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
import './_productNewPage.scss'

// Valores iniciales
const initialValues = {
    // Información básica
    name: '',
    description: '',
    brand: '',
    sku: '',
    category: '',

    // Precio y stock
    price: 0,
    stock: 0,
    discount: 0,

    // Variantes
    colors: [] as string[],
    sizes: [] as string[],

    // Imágenes
    images: [] as string[]
};

export const ProductNewPage = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const handleSubmit = async (values: typeof initialValues) => {
        // Crear objeto compatible con el thunk existente
        const productData = {
            title: values.name,
            description: values.description,
            brand: values.brand,
            sku: values.sku,
            categoryName: values.category,
            price: values.price,
            stock: values.stock,
            discount: values.discount,
            colors: values.colors,
            sizes: values.sizes,
            images: values.images
        };

        dispatch(startNewProduct(productData));
        if (productData) {
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