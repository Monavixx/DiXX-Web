import { useRef, useState } from "react";
import './css/SignUp.css';
import { useNavigate } from "react-router-dom";
import { useGoToProfileIfAuthenticated } from "../functions/redirections";
import { API } from "../API";

export default function SignUpComponent() {
    let usernameInput = useRef(null);
    let emailInput = useRef(null);
    let passwordInput = useRef(null);
    let passwordAgainInput = useRef(null);

    const navigate = useNavigate();

    const [message, setMessage] = useState('');

    useGoToProfileIfAuthenticated();

    function signUp() {
        if(passwordInput.current.value !== passwordAgainInput.current.value) {
            setMessage('Passwords aren\'t the same');
            return;
        }
        async function inner() {            
            try {
                await API.signUp(
                    usernameInput.current.value,
                    emailInput.current.value,
                    passwordInput.current.value);
                navigate('/login');
                return;
            }
            catch([data]) {
                setMessage(data.message);
            }
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
