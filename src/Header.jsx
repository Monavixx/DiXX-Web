import './Header.css';

export default function Header() {

    function toggleMenuButton() {

    }

    return (
        <>
        <div className="header">
            <div className="header-menu-button" onClick={toggleMenuButton}></div>
            <div className="header-dixx">DiXX</div>
            <div className="header-user-right">
                <div className='header-user-image'><img src='anonymous-user-icon.png' alt="anonymous" /></div>
                <div className="header-username">username</div>
            </div>
        </div>
        </>
    );
}