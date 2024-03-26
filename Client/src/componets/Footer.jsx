import githubLogo from '../assets/githubLogo.png'
export default function Footer(){
    return(
        <>
        <footer>
            <p>&copy; 2024</p>
            <ul className='footer-links'>
                <li><a href='https://github.com/cys2110' target='_blank'><img src={githubLogo} alt='github logo'/> Claire Sheridan</a></li>
                <li><a href='https://github.com/connorreidy1' target='_blank'><img src={githubLogo} alt='github logo'/> Connor Reidy</a></li>
                <li><a href='https://github.com/ItzelAlwarafi' target='_blank'><img src={githubLogo} alt='github logo'/> Itzel Alwarafi</a></li>
                <li><a href='https://github.com/persefy' target='_blank'><img src={githubLogo} alt='github logo'/> Stephanie Cancel</a></li>
            </ul>
        </footer>
        </>
    )
}