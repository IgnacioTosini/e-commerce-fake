import { FaBox, FaRegUser, FaStore } from 'react-icons/fa';
import { FiArrowRight } from "react-icons/fi";
import './_quickAccessCard.scss'

type ImageSvgKey = 'users' | 'orders' | 'products';

type QuickAccessCardProps = {
  title: string;
  description: string;
  link: string;
  icon: ImageSvgKey;
  total: number;
  subTitle: string;
}

export const QuickAccessCard = (props: QuickAccessCardProps) => {
  const { title, description, link, icon, total, subTitle } = props;
  const imageSvg = {
    users: <FaRegUser className='userIcon' />,
    orders: <FaBox className='orderIcon' />,
    products: <FaStore className='productIcon' />,
  }

  return (
    <section className='quickAccessCard'>
      <a href={link} className='quickAccessCardLink'>
        <div className='quickAccessCardHeader'>
          <div className='quickAccessCardHeaderText'>
            <h2>{title}</h2>
            <p>{description}</p>
          </div>
          {imageSvg[icon]}
        </div>
        <div className='quickAccessCardFooter'>
          <div className='quickAccessCardFooterText'>
            <span className='total'>{total}</span>
            <span>{subTitle}</span>
          </div>
          <FiArrowRight className='quickAccessCardArrow' />
        </div>
      </a>
    </section>
  )
}
