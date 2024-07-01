import {useState, useEffect, useRef} from 'react';
import {  useNavigate, useSearchParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './css/Login.css';
import { useGoToProfileIfAuthenticated } from '../functions/redirections';
import { API } from '../API';

function LoginComponent() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    let usernameInput = useRef(null);
    let passwordInput = useRef(null);

    let [isLoading, setIsLoading] = useState(false);
    
    useGoToProfileIfAuthenticated(!isLoading);

    useEffect(()=>{
        if(!isLoading)
            passwordInput.current.value = '';
    },[isLoading]);

    function login() {
        const after_login = searchParams.get('after_login');
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
    }

    function handleEnter(e) {
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
                                placeholder='username' onKeyDown={handleEnter}/>
                        </td>
                    </tr>
                    <tr>
                        <td>Password:</td>
                        <td>
                            <input className='login-input input' ref={passwordInput} type="password" placeholder='password'
                                onKeyDown={handleEnter}/>
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