import { LuClock4 } from "react-icons/lu";
import type { Product, User } from '../../../types';
import './_dateInformationCard.scss';

type DateInformationCardProps = {
    data: Product | User | null | undefined;
};

export const DateInformationCard = ({ data }: DateInformationCardProps) => {
    const formatDate = (dateString: string | undefined): string => {
        if (!dateString) return '';
        const date = new Date(dateString);
        const year = date.getFullYear().toString();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString();
        return `${year}-${month}-${day}`;
    };

    return (
        <div className="dateInformationCard">
            <h2>Información de fechas</h2>
            <section className="dateInformationCardSection">
                <LuClock4 className="dateInformationCardIcon" />
                <p>Creado <span>{formatDate(data?.createdAt)}</span></p>
            </section>
            <section className="dateInformationCardSection">
                <LuClock4 className="dateInformationCardIcon" />
                <p>Actualizado <span>{formatDate(data?.updatedAt)}</span></p>
            </section>
        </div>
    );
};
