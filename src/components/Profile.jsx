import { useDispatch, useSelector } from "react-redux"
import "./css/Profile.css";
import { useGoToLoginIfNotAuthenticated } from "../functions/redirections";
import { API } from "../API";
import { useEffect } from "react";
import { logoutAction } from "../slices/userReducer";


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
        if(wasLocationUpdated ) {
            API.checkForLogin();
        }
    },[wasLocationUpdated]);

    function logout() {
        localStorage.removeItem('token');
        dispatch(logoutAction());
    }
    return (
        <>
        <div className="profile">
            <h1>Profile</h1>
            <table cellPadding="4" >
                <tbody>
                    <tr>
                        <td>Username:</td>
                        <td><div>{username}</div></td>
                    </tr>
                    <tr>
                        <td>Email:</td>
                        <td><div>{email}</div></td>
                    </tr>
                </tbody>
            </table>
            <div className="profile-logout-div">
                <button className="shadow-button" onClick={logout}>Log out</button>
            </div>
        </div>
        </>
    )
}

