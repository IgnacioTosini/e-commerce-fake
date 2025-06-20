import { useParams } from 'react-router';
import { HeaderCustomActionsEdit } from '../../components/Admin/Edit/HeaderCustomActionsEdit/HeaderCustomActionsEdit'
import { InformationEditCard } from '../../components/Admin/Edit/InformationEditCard/InformationEditCard'
import { mockProducts } from '../../utils/mockProducts';
import { VariantInformationEditCard } from '../../components/Admin/Edit/VariantInformationEditCard/VariantInformationEditCard';
import { PriceStockEditCard } from '../../components/Admin/Edit/PriceStockEditCard/PriceStockEditCard';
import { ImagesInformationEditCard } from '../../components/Admin/Edit/ImagesInformationEditCard/ImagesInformationEditCard';
import './_productEditPage.scss'

export const ProductEditPage = () => {
    const { id } = useParams<{ id: string }>();
    const product = mockProducts.find(product => product.id === id);

    return (
        <div className='productEditPage'>
            <HeaderCustomActionsEdit type='product' />
            <div className='productEditPageContent'>
                <InformationEditCard data={product || null} type='product' />
                <VariantInformationEditCard data={product || null} type='product' />
                <PriceStockEditCard product={product || null} />
                <ImagesInformationEditCard product={product || null} />
            </div>
        </div>
    )
}
