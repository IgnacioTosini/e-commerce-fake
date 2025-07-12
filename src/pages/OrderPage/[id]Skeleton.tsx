import './_orderPageSkeleton.scss';

export const OrderPageSkeleton = () => {
    return (
        <section className='orderPageSkeleton'>
            <nav className='orderPageNavSkeleton'>
                <button type="button" className='backArrow'></button>
            </nav>
            <div className='orderPageContainerSkeleton'>
                <section className='orderPageHeaderSkeleton'>
                    <section className='orderPageHeaderInfoSkeleton'>
                        <h1 className='orderPageTitleSkeleton'></h1>
                        <p className='orderPageDateSkeleton'></p>
                    </section>
                </section>
                <section className='orderPageContentSkeleton'>
                    <section className='orderPageProductsDetailsSkeleton'>
                        <h2></h2>
                        <ul>
                            {[1, 2, 3, 4].map(i => {
                                return (
                                    <li key={i} className='orderPageProductItemSkeleton'>
                                        <div className='orderPageProductImageSkeleton' />
                                        <section className='orderPageProductInfoSkeleton'>
                                            <span className='orderPageProductTitleSkeleton'></span>
                                            <span className='productSizePriceSkeleton'></span>
                                        </section>
                                    </li>
                                );
                            })}
                        </ul>
                    </section>
                </section>
            </div>
        </section>
    );
};