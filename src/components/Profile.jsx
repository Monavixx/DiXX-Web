import { useDispatch, useSelector } from "react-redux"
import { logoutAction, pending } from "../slices/userReducer";
import "./css/Profile.css";
import { useGoToLoginIfNotAuthenticated } from "../functions/redirections";
import { get_request } from "../functions/send_request";
import { API } from "../API";
import { useEffect } from "react";


export default function Profile() {
    const username = useSelector(state=>state.user.name);
    const email = useSelector(state=>state.user.email);
    const dispatch = useDispatch();

    const wasLocationUpdated = useSelector(state=>state.location.wasUpdated);

    useGoToLoginIfNotAuthenticated();

    useEffect(()=>{
        // It checks if location has been ever changed. If it hasn't,
        // then checkForLogin has already called in AutoLoginComponent,
        // and it's not necessary to call it twice.
        if(wasLocationUpdated) {
            API.checkForLogin();
        }
    },[wasLocationUpdated]);

    function logout() {
        async function inner() {
            dispatch(pending(true));
            await get_request('logout/');
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

