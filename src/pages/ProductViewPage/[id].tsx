import { useParams } from 'react-router';
import { DateInformationCard } from '../../components/ProductDisplay/DateInformationCard/DateInformationCard';
import { VariantInformationCard } from '../../components/ProductDisplay/VariantInformationCard/VariantInformationCard';
import { ImagesInformationCard } from '../../components/ProductDisplay/ImagesInformationCard/ImagesInformationCard';
import { InformationCard } from '../../components/ProductDisplay/ProductInformationCard/InformationCard';
import { HeaderCustomActions } from '../../components/Admin/HeaderCustomActions/HeaderCustomActions';
import { useSelector } from 'react-redux';
import type { RootState } from '../../store/store';
import { InformationCustomCardSkeleton } from '../../components/Admin/Custom/InformationCustomCard/InformationCustomCardSkeleton';
import './_productViewPage.scss'

export const ProductViewPage = () => {
    const { id } = useParams<{ id: string }>();
    const { products, isLoading } = useSelector((state: RootState) => state.products);
    const product = products.find(product => product.id === id);

    if (isLoading) {
        return <InformationCustomCardSkeleton />;
    }

    return (
        <div className='productViewPage'>
            <HeaderCustomActions type='product' data={product || null} />
            <section className='productViewPageContent'>
                <InformationCard data={product || null} type='product' />
                <DateInformationCard data={product || null} />
                <VariantInformationCard data={product || null} />
                <ImagesInformationCard product={product || null} />
            </section>
        </div>
    )
}

export default ProductViewPage;
