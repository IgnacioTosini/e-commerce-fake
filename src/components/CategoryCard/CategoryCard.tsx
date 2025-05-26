import './_categoryCard.scss'

type CategoryCardProps = {
    category: {
        id: number;
        image?: string;
        title: string;
        description: string;
    }
}

export const CategoryCard = ({ category }: CategoryCardProps) => {
    const { image, title, description } = category;
    return (
        <div className="categoryCard">
            <img src={image} alt={title} />
            <div className="categoryCardOverlay">
                <h2 className="categoryCardTitle">{title}</h2>
                <p className="categoryCardDescription">{description}</p>
            </div>
        </div>
    )
}
