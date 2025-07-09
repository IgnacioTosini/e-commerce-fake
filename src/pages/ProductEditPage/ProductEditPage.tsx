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
import './_productEditPage.scss'

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

export const ProductEditPage = () => {
    const { id } = useParams<{ id: string }>();
    const { products, isLoading } = useSelector((state: RootState) => state.products);
    const product = products.find(product => product.id === id);
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    // Mapear los valores del producto a los nombres de campos del formulario
    const mappedInitialValues = product ? {
        // Información básica - mapear correctamente
        name: product.title || '',
        description: product.description || '',
        brand: product.brand || '',
        sku: product.sku || '',
        category: product.categoryName || '',

        // Precio y stock
        price: product.price || 0,
        stock: product.stock || 0,
        discount: product.discount || 0,

        // Variantes
        colors: product.colors || [],
        sizes: product.sizes || [],

        // Imágenes
        images: product.images || []
    } : initialValues;

    const handleSubmit = async (values: typeof initialValues) => {
        // Crear objeto compatible con el thunk existente
        const productData = {
            id: product?.id || '',
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
            images: values.images,
            rating: product?.rating || 0,
            createdAt: product?.createdAt || '',
            updatedAt: product?.updatedAt || ''
        };

        dispatch(startUpdateProduct(productData, product?.id || ''));
        if (!isLoading) {
            navigate('/admin/productos');
        }
    };

    if (!product) {
        return null;
    }
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
                            product={product}
                        />
                    </div>
                </Form>
            </Formik>
        </div>
    )
}