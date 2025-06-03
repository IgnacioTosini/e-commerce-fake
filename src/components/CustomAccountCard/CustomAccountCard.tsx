import { Link } from 'react-router';
import { FaRegUser, FaBox, FaRegHeart } from "react-icons/fa6";
import './_customAccountCard.scss'

type ImageSvgKey = 'user' | 'orders' | 'heart';

type CustomAccountCardProps = {
  img: ImageSvgKey;
  title: string;
  description: string;
  path: string;
}

export const CustomAccountCard = ({ img, title, description, path }: CustomAccountCardProps) => {
  const imageSvg = {
    user: <FaRegUser />,
    orders: <FaBox />,
    heart: <FaRegHeart />

  }
  return (
    <Link to={path} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="customAccountCard">
      <picture className='customAccountCardImage'>
        {imageSvg[img]}
      </picture>
      <section className='customAccountCardContent'>
        <h2>{title}</h2>
        <p>{description}</p>
      </section>
    </Link>
  )
}
