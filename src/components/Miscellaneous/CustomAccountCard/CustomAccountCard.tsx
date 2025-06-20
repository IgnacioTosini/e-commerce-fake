import { Link } from 'react-router';
import { FaRegUser, FaBox, FaRegHeart } from "react-icons/fa6";
import { RiGitRepositoryPrivateFill } from "react-icons/ri";
import './_customAccountCard.scss'

type ImageSvgKey = 'user' | 'orders' | 'heart' | 'admin';

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
    heart: <FaRegHeart />,
    admin: <RiGitRepositoryPrivateFill />,
  }
  if (!imageSvg[img]) {
    console.error(`Image SVG for key "${img}" not found.`);
    return null;
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
