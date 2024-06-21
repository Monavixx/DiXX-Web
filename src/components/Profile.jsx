import { useDispatch, useSelector } from "react-redux"
import { logoutRequest } from "../functions/auth";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { logoutAction, pending } from "../slices/userReducer";

import "./css/Profile.css";
import { useEffectOnLoadUserData } from "../functions/useEffectOnLoadUserData";


export default function Profile() {
    const username = useSelector(state=>state.user.name);
    const email = useSelector(state=>state.user.email);
    const is_authenticated = useSelector(state=>state.user.is_authenticated);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffectOnLoadUserData(()=>{
        if(!is_authenticated) {
            navigate('/login');
            return;
        }
    },[]);

    function logout() {
        async function inner() {
            dispatch(pending(true));
            await logoutRequest();
            dispatch(logoutAction());
        }
        inner();
    }
    return (
        <>
        <div className="profile">
            <h1>Profile</h1>
            <p className="profile-full-data">Username: 
                <span className="profile-data"> {username}</span></p>
            <p className="profile-full-data">Email: <span className="profile-data"> {email}</span></p>
            <div className="button-logout-div"><button onClick={logout} className="profile-logout-button">logout</button></div>
        </div>
        </>
    )
}

