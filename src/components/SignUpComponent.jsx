import { useRef, useState } from "react";
import './SignUp.css';
import { post_request } from "../functions/send_request";
import { useNavigate } from "react-router-dom";

export default function SignUpComponent() {
    let usernameInput = useRef(null);
    let emailInput = useRef(null);
    let passwordInput = useRef(null);
    let passwordAgainInput = useRef(null);

    const navigate = useNavigate();

    const [message, setMessage] = useState('');

    function signUp() {
        if(passwordInput.current.value !== passwordAgainInput.current.value) {
            setMessage('Passwords aren\'t the same');
            return;
        }
        async function inner() {
            let _data = await post_request('http://localhost:3001/signup/', {
                username: usernameInput.current.value,
                email: emailInput.current.value,
                password: passwordInput.current.value
            });
            _data = await _data.json();
            if(_data.success) {
                navigate('/login');
            }
            setMessage(_data.message);
        }
        inner();
    }

    return (
        <div className="signup">
            <h1>Sign up</h1>
            <div className="signup-form">
                <input ref={usernameInput} type="text" placeholder="username"/>
                <input ref={emailInput} type="email" placeholder="email" />
                <input ref={passwordInput} type="password" placeholder="password"/>
                <input ref={passwordAgainInput} type="password" placeholder="password again"/>
                <button onClick={signUp}>Sign up</button>
                <p className="message-signup">{message}</p>
            </div>
        </div>
    );
}
