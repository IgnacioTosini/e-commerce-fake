import { IoSearchSharp } from "react-icons/io5";
import './_searchBar.scss'

export const SearchBar = () => {
    return (
        <div className="searchBar">
            <input type="text" placeholder="Buscar Productos..." className='searchInput'/>
            <IoSearchSharp className='searchIcon' />
        </div>
    )
}
