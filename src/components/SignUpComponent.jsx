import { useRef, useState } from "react";
import './css/SignUp.css';
import { post_request } from "../functions/send_request";
import { useNavigate } from "react-router-dom";
import { useEffectOnLoadUserData } from "../functions/useEffectOnLoadUserData";
import { useSelector } from "react-redux";

export default function SignUpComponent() {
    let usernameInput = useRef(null);
    let emailInput = useRef(null);
    let passwordInput = useRef(null);
    let passwordAgainInput = useRef(null);

    const navigate = useNavigate();

    const [message, setMessage] = useState('');

    const is_authenticated = useSelector(state=>state.user.is_authenticated);

    useEffectOnLoadUserData(()=>{
        if(is_authenticated) {
            navigate('/profile');
            return;
        }
    });

    function signUp() {
        if(passwordInput.current.value !== passwordAgainInput.current.value) {
            setMessage('Passwords aren\'t the same');
            return;
        }
        async function inner() {
            let _data = await post_request('signup/', {
                username: usernameInput.current.value,
                email: emailInput.current.value,
                password: passwordInput.current.value
            });
            _data = await _data.json();
            if(_data.success) {
                navigate('/login');
                return;
            }
            setMessage(_data.message);
        }
        inner();
    }

    return (
        <div className="signup">
            <h1>Sign up</h1>
            <div className="signup-labels">
                <div className="signup-label">Username:</div>
                <div className="signup-label">Email:</div>
                <div className="signup-label">Password: </div>
                <div className="signup-label">Password again:</div>
            </div>
            <div className="signup-form">
                <input ref={usernameInput} type="text" placeholder="username"
                    onKeyDown={(e)=>{if(e.key==='Enter')signUp()}}/>
                <input ref={emailInput} type="email" placeholder="email" 
                    onKeyDown={(e)=>{if(e.key==='Enter')signUp()}}/>
                <input ref={passwordInput} type="password" placeholder="password"
                    onKeyDown={(e)=>{if(e.key==='Enter')signUp()}}/>
                <input ref={passwordAgainInput} type="password" placeholder="password again"
                    onKeyDown={(e)=>{if(e.key==='Enter')signUp()}}/>
            </div>
            <div className="signup-button-div"><button onClick={signUp} className="signup-button">Sign up</button></div>
            <p className="message-signup">{message}</p>
        </div>
    );
}
