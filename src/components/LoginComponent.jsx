import {useState, useEffect, useRef} from 'react';
import {post_request, get_request} from '../functions/send_request';
import {useDispatch} from 'react-redux';
import { loginAction, logoutAction } from '../slices/userReducer';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

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
    
    if(isLoading)return (<p>Loading...</p>);
    
    return (
        <div className="logincomponent">
            <p>Please, log in</p>
            <div className="form">
                <input ref={usernameInput} type="text" placeholder='username'/>
                <input ref={passwordInput} type="password" placeholder='password'/>
                <button onClick={login}>login</button>
            </div>
            <Link to='/signup'>don't have an account?</Link>
        </div>
    );
}




export default LoginComponent;