import {useState, useEffect, useRef} from 'react';
import {post_request, get_request} from '../functions/send_request';
import {useDispatch} from 'react-redux';
import { loginAction, logoutAction } from '../slices/userReducer';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './Login.css';

function LoginComponent() {
    const dispatch = useDispatch();
    
    const navigate = useNavigate();

    let usernameInput = useRef(null);
    let passwordInput = useRef(null);

    let [message, setMessage] = useState('');
    let [isLoading, setIsLoading] = useState(true);

    useEffect(()=>{
        async function inner(){
            setIsLoading(true);
            let _data = await (await get_request('login/')).json();
            
            setMessage(_data.message);

            if(_data.is_authenticated) {
                dispatch(loginAction({name:_data.username,
                                email:_data.email
                }));
            }
            setIsLoading(false);

        };inner();
    }, []);
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
                navigate('/profile');
            }
            setIsLoading(false);
        }
        inner();
    }     
    
    //if(isLoading)return (<p>Loading...</p>);
    
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