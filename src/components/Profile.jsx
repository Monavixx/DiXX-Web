import { useDispatch, useSelector } from "react-redux"
import { logoutRequest } from "../functions/auth";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { logoutAction } from "../slices/userReducer";


export default function Profile() {
    const username = useSelector(state=>state.user.name);
    const email = useSelector(state=>state.user.email);
    const isUserDataPending = useSelector(state=>state.user.is_pending);
    const is_authenticated = useSelector(state=>state.user.is_authenticated);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(()=>{
        if(!isUserDataPending) {
            if(!is_authenticated) {
                navigate('/login');
            }
        }
    },[isUserDataPending, is_authenticated]);

    function logout() {
        const resp = logoutRequest();
        dispatch(logoutAction());
    }
    return (
        <div className="profile">
            <h1>Profile</h1>
            <p>Username: {username}</p>
            <p>Email: {email}</p>
            <button onClick={logout}>logout</button>
        </div>
    )
}

