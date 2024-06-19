import { useSelector } from 'react-redux';
import './Header.css';
import {Link} from 'react-router-dom';

export default function Header() {
    const username = useSelector(state=>state.user.name);
    

    function toggleMenuButton() {

    }

    return (
        <>
        <div className="header">
            <div className="header-menu-button" onClick={toggleMenuButton}></div>
            <div className="header-dixx"><Link to='/'>DiXX</Link></div>
            <div className="header-user-right">
                <div className='header-user-image'><Link to='/login'><img src='anonymous-user-icon.png' alt="anonymous" /></Link></div>
                <div className="header-username"><Link to='/login'>{username}</Link></div>
            </div>
        </div>
        </>
    );
}