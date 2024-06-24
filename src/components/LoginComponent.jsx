import {useState, useEffect, useRef} from 'react';
import {  useNavigate, useSearchParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './css/Login.css';
import { useGoToProfileIfAuthenticated } from '../functions/redirections';
import { API } from '../API';

function LoginComponent() {
    const navigate = useNavigate();

    let usernameInput = useRef(null);
    let passwordInput = useRef(null);

    let [isLoading, setIsLoading] = useState(false);
    
    const [searchParams] = useSearchParams();

    useGoToProfileIfAuthenticated(!isLoading);

    useEffect(()=>{
        if(!isLoading)
            passwordInput.current.value = '';
    },[isLoading]);

    function login() {
        const after_login = searchParams.get('after_login');
        setIsLoading(true);

        API.login(usernameInput.current.value, passwordInput.current.value)
        .then(_data => {
            console.log('then');
            if(after_login !== null && after_login !== '/profile') {
                navigate(after_login);
                console.log('go after login')
                return;
            }
            navigate('/profile');
        })
        .catch(_data=>{})
        .finally(()=>{
            setIsLoading(false);
        });
    }
    
    return (
        <div className="logincomponent">
            <p className='login-h'>{isLoading ? "Loading..." : "Please, log in"}</p>
            <div className='login-labels'>
                <div className="login-label">Username:</div>
                <div className="login-label">Password:</div>
            </div>
            <div className="login-form">
                <input ref={usernameInput} type="text" placeholder='username'
                    onKeyDown={(e)=>{if(e.key==='Enter')login()}}/>
                <input ref={passwordInput} type="password" placeholder='password'
                    onKeyDown={(e)=>{if(e.key==='Enter')login()}}/>
                
            </div>
            <button onClick={login} className='login-button'>login</button>
            <div className='login-ref-to-signup'><Link to='/signup'>don't have an account?</Link></div>
        </div>
    );
}




export default LoginComponent;