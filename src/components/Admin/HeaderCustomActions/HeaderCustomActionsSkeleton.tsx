import { Link } from 'react-router'
import './_headerCustomActionsSkeleton.scss'

export const HeaderCustomActionsSkeleton = () => {

  return (
    <div className='headerCustomActionsSkeleton'>
        <section className='headerCustomActionsContentSkeleton'>
          <button type="button" className='headerCustomActionsBack'></button>
          <section className='headerCustomActionsInfoSkeleton'>
            <h2></h2>
            <p></p>
          </section>
          <div className='headerCustomActionsButtonsSkeleton'>
            <Link to={''}></Link>
            <button></button>
          </div>
        </section>
    </div>
  )
}
