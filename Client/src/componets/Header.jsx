import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

export default function Header(){
    return(
        <div>
            <h1>Tessera</h1>
            <div>
                <Link to="/"><FontAwesomeIcon icon={faHouse} /></Link>
            </div>
        </div>
    )
}