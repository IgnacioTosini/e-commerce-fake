import React from "react";
import { FaRegHeart } from "react-icons/fa";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { MdOutlinePerson } from "react-icons/md";

import './_customIcon.scss'

type CustomIconProps = {
    typeOfIcon: string;
}

export const CustomIcon = ({ typeOfIcon }: CustomIconProps) => {
    const icons: Record<string, React.ReactNode> = {
        cart: <AiOutlineShoppingCart />,
        user: <MdOutlinePerson />,
        heart: <FaRegHeart />,
    };
    return (
        <div className={`customIcon ${typeOfIcon}`}>
            {icons[typeOfIcon] || <span>❓</span>}
        </div>
    )
}
