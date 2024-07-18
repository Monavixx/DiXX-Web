import { useSelector } from 'react-redux';
import './css/Header.css';
import {Link, useLocation} from 'react-router-dom';
import React, {useRef, useEffect} from 'react';
import { API_URL } from '../settings.ts';
import { useIsAuthenticated, useIsPending } from '../functions/auth.ts';
import Hammer from 'hammerjs';
import { RootState } from '../store.ts';

export default function Header() {
    const username = useSelector<RootState, string>(state=>state.user.name);
    const is_authenticated = useIsAuthenticated();
    const isUserDataPending = useIsPending();
    const menu = useRef<HTMLDivElement>(null);
    const menuButton = useRef<HTMLDivElement>(null);
    const timeoutId = useRef<number|null>(null);
    const location = useLocation();

    useEffect(()=>{
        document.onclick = (e) =>{
            if(!menu.current!.contains(e.target as Node|null) && !menuButton.current!.contains(e.target as Node|null))
                toggleMenuButton(false);
        };
        // Menu swipe
        const hammer = new Hammer(menu.current!) as any;

        function handleSwipe(e) {
            if(e.direction === (Hammer as any).DIRECTION_LEFT) {
                toggleMenuButton(false);
            }
        }
        hammer.on('swipe', handleSwipe);

        // Menu open if mouse in the left
        function handleMouseMove(e) {
            if(e.clientX === 0) {
                toggleMenuButton(true);
            }
        }
        document.addEventListener('mousemove', handleMouseMove);
        return () => {
            hammer.off('swipe', handleSwipe);
            document.removeEventListener('mousemove', handleMouseMove);
        }
    },[]);

    useEffect(()=>{
        for(let v of document.getElementsByClassName('menu-ref')) {
            if(location.pathname
                === (v!.firstChild as HTMLAnchorElement)!.href.slice(API_URL.length)) {
                v.classList.add('menu-active-ref');
            }
            else {
                v.classList.remove('menu-active-ref');
            }
        };
    },[location]);

    function toggleMenuButton(force:boolean|null=null) {
        if((menuButton.current!.classList.contains('header-menu-button-toggle-off') || force===true) && force !== false) {
            menuButton.current!.classList.remove('header-menu-button-toggle-off');
            menuButton.current!.classList.add('header-menu-button-toggle-on');
            menu.current!.style.display = 'flex';
            menu.current!.classList.remove('menu-toggle-off');
            clearTimeout(timeoutId.current!);
        }
        else if (!menuButton.current!.classList.contains('header-menu-button-toggle-off') || force===false){
            menuButton.current!.classList.add('header-menu-button-toggle-off');
            menuButton.current!.classList.remove('header-menu-button-toggle-on');
            menu.current!.classList.add('menu-toggle-off');

            //Here the ms timeout must be the same as in css
            timeoutId.current = setTimeout(()=>{menu.current!.style.display = 'none'},300);
        }
    }

    return (
        <>
        <div className="header" >
            <div ref={menuButton} className="scaled-button header-menu-button header-menu-button-toggle-off" onClick={()=>toggleMenuButton()}>
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
            
            <div className="menu-top-refs">
                <div className="menu-create-new-set-ref menu-ref">
                    <Link to='/create-new-set'><div className='shadow-button'>Create new set</div></Link>
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