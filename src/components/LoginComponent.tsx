import React, {useState, useEffect, useRef} from 'react';
import {  useNavigate, useSearchParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './css/Login.css';
import { useGoToProfileIfAuthenticated } from '../functions/redirections.ts';
import { useDispatch } from 'react-redux';
import { UserActions } from '../slices/userSlice.ts';
import { useIsAuthenticated, useIsPending } from '../functions/auth.ts';
import { AppDispatch } from '../store.ts';

function LoginComponent() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    const usernameInput = useRef<HTMLInputElement>(null);
    const passwordInput = useRef<HTMLInputElement>(null);

    const [isLoading, setIsLoading] = useState(false);

    const pending = useIsPending();
    const isAuthenticated = useIsAuthenticated();
    
    useGoToProfileIfAuthenticated(!isLoading);

    useEffect(()=>{
        if(!isLoading)
            passwordInput.current!.value = '';
    },[isLoading]);

    useEffect(()=>{
        if(!pending && isAuthenticated) {
            const after_login = searchParams.get('after_login');
            if(after_login !== null /*&& after_login !== '/profile'*/) {
                navigate(after_login);
                return;
            }
            navigate('/profile');
        }
        setIsLoading(false);
    }, [pending, isAuthenticated]);

    function login() {
        /*const after_login = searchParams.get('after_login');
        setIsLoading(true);

        
        API.login(usernameInput.current.value, passwordInput.current.value)
        .then(() => {
            if(after_login !== null && after_login !== '/profile') {
                navigate(after_login);
                return;
            }
            navigate('/profile');
        })
        .catch(()=>{})
        .finally(()=>{
            setIsLoading(false);
        });
        */
        setIsLoading(true);
        dispatch(UserActions.logIn({
            username: usernameInput.current!.value,
            password: passwordInput.current!.value
        }));
    }

    function loginOnEnter(e) {
        if(e.key === 'Enter') {
            login();
        }
    }
    
    return (
        <>
        <div className="logincomponent">
            <p className='login-h'>{isLoading ? "Loading..." : "Please, log in"}</p>
            <table cellPadding="3">
                <tbody>
                    <tr>
                        <td>Username:</td>
                        <td>
                            <input className='login-input input' ref={usernameInput} type="text" 
                                placeholder='username' onKeyDown={loginOnEnter}/>
                        </td>
                    </tr>
                    <tr>
                        <td>Password:</td>
                        <td>
                            <input className='login-input input' ref={passwordInput} type="password" placeholder='password'
                                onKeyDown={loginOnEnter}/>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div className='login-button-div'>
                <button onClick={login} className='shadow-button'>Log in</button>
            </div>
            <div className='login-ref-to-signup'><Link to='/signup'>don't have an account?</Link></div>
        </div>
        </>
    );
}

export default LoginComponent;