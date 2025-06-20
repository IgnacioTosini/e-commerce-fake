import { useParams } from 'react-router';
import { mockProducts } from '../../utils/mockProducts';
import { DateInformationCard } from '../../components/ProductDisplay/DateInformationCard/DateInformationCard';
import { VariantInformationCard } from '../../components/ProductDisplay/VariantInformationCard/VariantInformationCard';
import { ImagesInformationCard } from '../../components/ProductDisplay/ImagesInformationCard/ImagesInformationCard';
import { InformationCard } from '../../components/ProductDisplay/ProductInformationCard/InformationCard';
import { HeaderCustomActions } from '../../components/Admin/HeaderCustomActions/HeaderCustomActions';
import './_productViewPage.scss'

export const ProductViewPage = () => {
    const { id } = useParams<{ id: string }>();
    const product = mockProducts.find(product => product.id === id);
    return (
        <div className='productViewPage'>
            <HeaderCustomActions type='product' data={product || null} />
            <section className='productViewPageContent'>
                <InformationCard data={product || null} type='product' />
                <DateInformationCard data={product || null} />
                <VariantInformationCard data={product || null} type='product' />
                <ImagesInformationCard product={product || null} />
            </section>
        </div>
    )
}
