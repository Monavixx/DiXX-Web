import { useSelector } from 'react-redux';
import './css/Header.css';
import {Link, useLocation} from 'react-router-dom';
import React, {useRef, useEffect} from 'react';
import {rootdom} from '../index.jsx';
import { API_URL } from '../settings.js';
import { useIsAuthenticated } from '../functions/auth.js';

export default function Header() {
    const username = useSelector(state=>state.user.name);
    const is_authenticated = useIsAuthenticated();
    const isUserDataPending = useSelector(state=>state.user.is_pending);
    const menu = useRef(null);
    const menuButton = useRef(null);
    const menuButton2 = useRef(null);
    const timeoutId = useRef(null);
    const location = useLocation();

    useEffect(()=>{
        document.body.onclick = (e) =>{
            if(e.target === rootdom)
            toggleMenuButton(false);
        };
    },[]);

    useEffect(()=>{
        for(let v of document.getElementsByClassName('menu-ref')) {
            if(location.pathname
                === v.firstChild.href.slice(API_URL.length)) {
                v.classList.add('menu-active-ref');
            }
            else {
                v.classList.remove('menu-active-ref');
            }
        };
    },[location]);

    function toggleMenuButton(force=null) {
        if((menuButton.current.classList.contains('header-menu-button-toggle-off') || force===true) && force !== false) {
            menuButton.current.classList.remove('header-menu-button-toggle-off');
            menuButton.current.classList.add('header-menu-button-toggle-on');
            menuButton2.current.classList.remove('header-menu-button-toggle-off');
            menuButton2.current.classList.add('header-menu-button-toggle-on');
            menu.current.style.display = 'flex';
            menu.current.classList.remove('menu-toggle-off');
            clearTimeout(timeoutId);
        }
        else if (!menuButton.current.classList.contains('header-menu-button-toggle-off') || force===false){
            menuButton.current.classList.add('header-menu-button-toggle-off');
            menuButton.current.classList.remove('header-menu-button-toggle-on');
            menuButton2.current.classList.add('header-menu-button-toggle-off');
            menuButton2.current.classList.remove('header-menu-button-toggle-on');
            menu.current.classList.add('menu-toggle-off');

            //Here the ms timeout must be the same as in css
            timeoutId.current = setTimeout(()=>{menu.current.style.display = 'none'},300);
        }
    }

    return (
        <>
        <div className="header">
            <div ref={menuButton} className="header-menu-button header-menu-button-toggle-off" onClick={toggleMenuButton}>
                <div></div>
                <div></div>
                <div></div>
            </div>
            <div className="header-dixx"><Link to='/'>DiXX</Link></div>
            <div className="header-user-right">
                <div className='header-user-image'><Link to='/profile'><img src='/anonymous-user-icon.png' alt="anonymous" /></Link></div>
                <div className="header-username"><Link to='/profile'>{!isUserDataPending && username}</Link></div>
            </div>
        </div>
        <div className="menu menu-toggle-off" ref={menu}>
            <div className='menu-parent-menu-button'>
                <div ref={menuButton2} className="header-menu-button header-menu-button-toggle-off" onClick={toggleMenuButton}>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
            <div className="menu-top-refs">
                <div className="menu-create-new-set-ref menu-ref">
                    <Link to='/create-new-set'><div>Create new set</div></Link>
                </div>
                <div className="menu-sets-refs">
                    <div className="menu-your-sets-ref menu-ref">
                        <Link to='/sets/your'><div>Your sets</div></Link>
                    </div>
                    <div className="menu-learn-ref menu-ref">
                        <Link to='/learn'><div>Learn</div></Link>
                    </div>
                    <div className="menu-other-peoples-sets-ref menu-ref">
                        <Link to='/sets-of-others'><div>Other people's sets</div></Link>
                    </div>
                    <div className="menu-archive-ref menu-ref">
                        <Link to='/archive'><div>Archive</div></Link>
                    </div>
                </div>
                <div className="menu-friends-ref menu-ref">
                    <Link to='/friends'><div>Friends</div></Link>
                </div>
            </div>
            <div className="menu-bottom-refs">
                <div className="menu-info-refs">
                    <div className="menu-about-us-ref menu-ref">
                        <Link to='/about-us'><div>Abous us</div></Link>
                    </div>
                    <div className="menu-api-ref menu-ref">
                        <Link to='/api'><div>API</div></Link>
                    </div>
                </div>
                {!is_authenticated ?
                    <div className="menu-auth-refs">
                        <div className="menu-signup-ref menu-ref">
                            <Link to='/signup'><div>Sign up</div></Link>
                        </div>
                        <div className="menu-log-in-ref menu-ref" >
                            <Link to='/login'><div>Log in</div></Link>
                        </div>
                    </div>
                    :
                    <div className="menu-profile-ref menu-ref" >
                        <Link to='/profile'><div>Profile</div></Link>
                    </div>
                }
            </div>
        </div>
        </>
    );
}