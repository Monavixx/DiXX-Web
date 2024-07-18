import React, { useLayoutEffect, useRef, useState } from "react";
import './css/SignUp.css';
import { useNavigate } from "react-router-dom";
import { useGoToProfileIfAuthenticated } from "../functions/redirections.ts";
import { API } from "../API.js";
import { useDispatch, useSelector } from "react-redux";
import { TSignUpError, TSignUpErrors, UserActions } from "../slices/userSlice.ts";
import { AppDispatch, RootState } from "../store.ts";

export default function SignUpComponent() {
    let usernameInput = useRef<HTMLInputElement>(null);
    let emailInput = useRef<HTMLInputElement>(null);
    let passwordInput = useRef<HTMLInputElement>(null);
    let passwordAgainInput = useRef<HTMLInputElement>(null);

    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();


    const errors = useSelector<RootState, TSignUpErrors>(state=>state.user.signUp.errors);
    const [errorsPasswordAgain, setErrorsPasswordAgain] = useState<TSignUpError>([]);
    const success = useSelector<RootState, boolean>(state=>state.user.signUp.success);

    useGoToProfileIfAuthenticated();

    useLayoutEffect(()=> {
        if(success) {
            navigate('/login');
        }
    }, [success]);

    useLayoutEffect(()=> {
        return () => {
            initSignUp();
        }
    },[]);

    function signUp() {
        initSignUp();

        if(passwordInput.current!.value !== passwordAgainInput.current!.value) {
            setErrorsPasswordAgain(['Passwords aren\'t the same']);
            return;
        }
        if(passwordAgainInput.current!.value.trim().length <= 0) {
            setErrorsPasswordAgain(['This field may not be blank']);
            return;
        }
        dispatch(UserActions.signUp({
            username:usernameInput.current!.value,
            email:emailInput.current!.value,
            password:passwordInput.current!.value
        }));        
    }
    function initSignUp() {
        dispatch(UserActions.initSignUp());
        setErrorsPasswordAgain([]);
    }
    function handleEnter(e) {
        if(e.key==='Enter')
            signUp();
    }

    function getUsernameError() {
        return errors.username.length>0 && errors.username[0];
    }
    function getEmailError() {
        return errors.email.length>0 && errors.email[0];
    }
    function getPasswordError() {
        return errors.password.length>0 && errors.password[0];
    }
    function getPasswordAgainError() {
        return errorsPasswordAgain.length>0 && errorsPasswordAgain[0];
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
                        <td>
                            <div className="signup-error">{getUsernameError()}</div>
                        </td>
                    </tr>
                    <tr>
                        <td>Email:</td>
                        <td>
                            <input ref={emailInput} type="email" placeholder="email" 
                                onKeyDown={handleEnter} className="input"/>
                        </td>
                        <td>
                            <div className="signup-error">{getEmailError()}</div>
                        </td>
                    </tr>
                    <tr>
                        <td>Password:</td>
                        <td>
                            <input ref={passwordInput} type="password" placeholder="password"
                                onKeyDown={handleEnter} className="input"/>
                        </td>
                        <td>
                            <div className="signup-error">{getPasswordError()}</div>
                        </td>
                    </tr>
                    <tr>
                        <td>Password again:</td>
                        <td>
                            <input ref={passwordAgainInput} type="password" placeholder="password again"
                                onKeyDown={handleEnter} className="input"/>
                        </td>
                        <td>
                            <div className="signup-error">{getPasswordAgainError()}</div>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div className="signup-button-div">
                <button onClick={signUp} className="signup-button shadow-button">Sign up</button>
            </div>
        </div>
        </>
    );
}
