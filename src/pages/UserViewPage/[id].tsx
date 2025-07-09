import { useParams } from 'react-router';
import { InformationCard } from '../../components/ProductDisplay/ProductInformationCard/InformationCard';
import { DateInformationCard } from '../../components/ProductDisplay/DateInformationCard/DateInformationCard';
import { UserOrderList } from '../../components/ui/UserOrderList/UserOrderList';
import { HeaderCustomActions } from '../../components/Admin/HeaderCustomActions/HeaderCustomActions';
import { useSelector } from 'react-redux';
import type { RootState } from '../../store/store';
import './_userViewPage.scss'

export const UserViewPage = () => {
    const { id } = useParams<{ id: string }>();
    const { users } = useSelector((state: RootState) => state.user);
    const user = users.find((user) => user.id === id) || null;

    return (
        <div className='userViewPage'>
            <HeaderCustomActions data={user || null} type='user' />
            <section className='userViewPageContent'>
                <InformationCard data={user || null} type='user' />
                <DateInformationCard data={user || null} />
                <UserOrderList orders={user?.orders || null} />
            </section>
        </div>
    )
}
