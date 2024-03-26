import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse, faBars, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

export default function Header(){

    return(
        <>
        <header>
            <div className='header-row-1'>
                <div>
                    <FontAwesomeIcon icon={faBars} className='menu-icon' />
                </div>
                <h1>Tessera</h1>
                <div>
                    <FontAwesomeIcon icon={faMagnifyingGlass} className='search-icon' onClick={()=> {
                        document.querySelector('.search-bar').classList.toggle('display-none')
                    }}/>
                </div>  
            </div>
            <div className='header-row-2'>
                <div>
                    <Link to="/"><FontAwesomeIcon icon={faHouse} className='home-icon' /></Link>
                </div>
                <div className='search-bar-holder'>
                    <input type='text' placeholder='Search' className='search-bar display-none'/>
                </div>
                <div></div>
            </div>
        </header>
        </>
    )
}