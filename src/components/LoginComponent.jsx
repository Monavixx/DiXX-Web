import {useState, useEffect, useRef} from 'react';
import { post_request_json} from '../functions/send_request';
import {useDispatch} from 'react-redux';
import { loginAction } from '../slices/userReducer';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './css/Login.css';
import { useGoToProfileIfAuthenticated } from '../functions/redirections';

function LoginComponent() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    let usernameInput = useRef(null);
    let passwordInput = useRef(null);

    let [isLoading, setIsLoading] = useState(false);
    const [searchParams] = useSearchParams();

    useGoToProfileIfAuthenticated();

    useEffect(()=>{
        if(!isLoading)
            passwordInput.current.value = '';
    },[isLoading]);

    function login() {
        async function inner() {
            setIsLoading(true);
            /*dispatch(pending(false)) is not necessary here
             'cause after login it redirects to profile and in App.jsx it's called
            */
            let [_data] = await post_request_json('login/',
                {username: usernameInput.current.value,
                 password: passwordInput.current.value});

            
            if(_data.is_authenticated) {
                dispatch(loginAction({name:_data.username,
                                email:_data.email
                }));
                if(searchParams.get('after_login') !== null) {
                    navigate(searchParams.get('after_login'));
                    return;
                }
                navigate('/profile');
                return;
            }
            setIsLoading(false);
        }
        inner();
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