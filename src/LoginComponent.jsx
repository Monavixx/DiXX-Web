import {useState, useEffect, useRef} from 'react';
import {post_request, get_request} from './send_request';
import {useSelector, useDispatch} from 'react-redux';
import { loginAction, logoutAction } from './slices/userReducer';
import { useNavigate } from 'react-router-dom';
import { logoutRequest } from './functions/auth';

function LoginComponent() {
    const username = useSelector(state=>state.user.name);
    const email = useSelector(state=>state.user.email);
    const is_authenticated = useSelector(state=>state.user.is_authenticated);
    const dispatch = useDispatch();
    
    const navigate = useNavigate();

    let usernameInput = useRef(null);
    let passwordInput = useRef(null);

    let [message, setMessage] = useState('');
    let [isLoading, setIsLoading] = useState(true);

    useEffect(()=>{
        async function inner(){
            setIsLoading(true);
            let _data = await (await get_request('http://localhost:3001/login/')).json();
            
            setMessage(_data.message);

            if(_data.is_authenticated) {
                dispatch(loginAction({name:_data.username,
                                email:_data.email
                }));
            }
            setIsLoading(false);

        };inner();
    }, []);

    function login() {
        async function inner() {
            setIsLoading(true);
            let _data = await (await post_request('http://localhost:3001/login/',
                {username: usernameInput.current.value,
                 password: passwordInput.current.value})).json();

            setMessage(_data.message);
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

    function logout() {
        async function inner() {
            setIsLoading(true);
            let _data = await logoutRequest(dispatch);
            setMessage(_data.message);
            setIsLoading(false);
        }
        inner(); 
    }

    
    if(isLoading)return (<p>Loading...</p>);
    
    return (
        <div className="logincomponent">
            <p>{message}</p>
            <div className="form">
                <input ref={usernameInput} type="text" placeholder='username'/>
                <input ref={passwordInput} type="password" placeholder='password'/>
                <button onClick={login}>login</button>
            </div>
        </div>
    );
}




export default LoginComponent;