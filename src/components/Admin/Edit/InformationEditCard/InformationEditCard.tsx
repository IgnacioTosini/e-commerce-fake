import type { Product, User } from '../../../../types';
import { categories } from '../../../../utils/mockCategories';
import './_informationEditCard.scss'

type InformationEditCardProps = {
    data: Product | User | null | undefined;
    type: 'product' | 'user';
};

export const InformationEditCard = ({ data, type }: InformationEditCardProps) => {
    return (
        <div className='informationEditCard'>
            <h2 className='informationEditCardTitle'>Información Básica</h2>
            <p className='informationEditCardSubtitle'>Detalles sobre el {type === 'product' ? 'producto' : 'usuario'} seleccionado.</p>
            {type === 'product' ? (
                <form className='informationEditCardForm'>
                    <div className='informationEditCardGroup'>
                        <div className='informationEditCardInputGroup'>
                            <label htmlFor="name" className='informationEditCardLabel'>Nombre del Producto</label>
                            <input type="text" id="name" name="name" defaultValue={(data as Product)?.title} className='informationEditCardInput' />
                        </div>

                        <div className='informationEditCardInputGroup'>
                            <label htmlFor="sku" className='informationEditCardLabel'>SKU</label>
                            <input type="text" id="sku" name="sku" defaultValue={(data as Product)?.sku} className='informationEditCardInput' />
                        </div>
                    </div>

                    <div className='informationEditCardInputGroup'>
                        <label htmlFor="description" className='informationEditCardLabel'>Descripción</label>
                        <textarea name="description" id="description" defaultValue={(data as Product)?.description} className='informationEditCardInput textArea'></textarea>
                    </div>

                    <div className='informationEditCardGroup'>
                        <div className='informationEditCardInputGroup'>
                            <label htmlFor="brand" className='informationEditCardLabel'>Marca</label>
                            <input type="text" id="brand" name="brand" defaultValue={(data as Product)?.brand} className='informationEditCardInput' />
                        </div>

                        <div className='informationEditCardInputGroup'>
                            <label htmlFor="category" className='informationEditCardLabel'>Categoría</label>
                            <select name="category" id="category" defaultValue={(data as Product)?.categoryName.name} className='informationEditCardInput select'>
                                {categories.map(category => (
                                    <option key={category.id} value={category.name}>
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </form>
            ) : (
                <></>
                /*             <form action="">
                                <label htmlFor="fullName">Nombre Completo:</label>
                                <input type="text" id="fullName" name="fullName" defaultValue={data?.name} />
                
                                <label htmlFor="phone">Teléfono:</label>
                                <input type="tel" id="phone" name="phone" defaultValue={data?.phone} />
                
                                <button type="submit">Guardar</button>
                            </form> */
            )}
        </div>
    )
}
