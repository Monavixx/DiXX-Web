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
    function handleEnter(e) {
        if(e.key==='Enter')
            signUp();
    }

    return (
        <>
        
        <div className="signup">
            <h1>Sign up</h1>
            <table cellPadding={2}>
                <tbody>
                    <tr>
                        <td>Username:</td>
                        <td>
                            <input ref={usernameInput} type="text" placeholder="username"
                                onKeyDown={handleEnter} className="input"/>
                        </td>
                    </tr>
                    <tr>
                        <td>Email:</td>
                        <td>
                            <input ref={emailInput} type="email" placeholder="email" 
                                onKeyDown={handleEnter} className="input"/>
                        </td>
                    </tr>
                    <tr>
                        <td>Password:</td>
                        <td>
                            <input ref={passwordInput} type="password" placeholder="password"
                                onKeyDown={handleEnter} className="input"/>
                        </td>
                    </tr>
                    <tr>
                        <td>Password again:</td>
                        <td>
                            <input ref={passwordAgainInput} type="password" placeholder="password again"
                                onKeyDown={handleEnter} className="input"/>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div className="signup-button-div">
                <button onClick={signUp} className="signup-button shadow-button">Sign up</button>
            </div>
            <p className="message-signup">{message}</p>
        </div>
        </>
    );
}
