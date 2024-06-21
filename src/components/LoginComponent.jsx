import {useState, useEffect, useRef} from 'react';
import {post_request, get_request} from '../functions/send_request';
import {useDispatch, useSelector} from 'react-redux';
import { loginAction, logoutAction } from '../slices/userReducer';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './css/Login.css';
import { useEffectOnLoadUserData } from '../functions/useEffectOnLoadUserData';

function LoginComponent() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    let usernameInput = useRef(null);
    let passwordInput = useRef(null);

    let [isLoading, setIsLoading] = useState(false);
    const [searchParams] = useSearchParams();

    const is_authenticated = useSelector(state=>state.user.is_authenticated);

    useEffectOnLoadUserData(()=>{
        if(is_authenticated) {
            navigate('/profile');
            return;
        }
    },[]);

    useEffect(()=>{
        if(!isLoading)
            passwordInput.current.value = '';
    },[isLoading]);

    function login() {
        async function inner() {
            setIsLoading(true);
            let _data = await (await post_request('login/',
                {username: usernameInput.current.value,
                 password: passwordInput.current.value})).json();

            
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