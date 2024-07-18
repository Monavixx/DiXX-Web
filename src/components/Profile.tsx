import { useDispatch, useSelector } from "react-redux"
import "./css/Profile.css";
import { useGoToLoginIfNotAuthenticated } from "../functions/redirections.ts";
import React from "react";
import { useEffect } from "react";
import { UserActions } from "../slices/userSlice.ts";
import { AppDispatch, RootState } from "../store.ts";


export default function Profile() {
    const username = useSelector<RootState, string>(state=>state.user.name);
    const email = useSelector<RootState, string>(state=>state.user.email);
    const dispatch = useDispatch<AppDispatch>();

    const wasLocationUpdated = useSelector<RootState, boolean>(state=>state.location.wasUpdated);
    

    useGoToLoginIfNotAuthenticated();

    useEffect(()=>{
        // It checks if location has been ever changed. If it hasn't,
        // then checkForLogin has already called in AutoLoginComponent,
        // and it's not necessary to call it twice.
        if(wasLocationUpdated) {
            dispatch(UserActions.checkIfLoggedIn());
        }
    },[wasLocationUpdated, dispatch]);

    function logout() {
        dispatch(UserActions.logoutAction());
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

