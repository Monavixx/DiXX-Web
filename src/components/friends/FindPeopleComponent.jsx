import { useRef, useState } from "react";
import { API } from "../../API";

export default function FindPeopleComponent() {
    const usernameInput = useRef(null);
    const [friends, setFriends] = useState([]);
    const sendRequestButtons = useRef([]);


    function findPeople() {
        if(usernameInput.current.value.trim().length <= 0) return;

        setFriends([{'username': 'monavixx'}]);
    }

    function sendRequest(e, username) {
        API.sendFriendRequest(username).then(([,status])=>{
            if(status === 200) {
                e.target.disabled = true;
                e.target.textContent = 'Sent';
            }
        });
    }

    return (
        <div className="find-people">
            <div className="find-people-form">
                <div className="find-people-input-username">
                    <input ref={usernameInput} className="input" type="text" placeholder="username" />
                </div>
                <div className="find-people-button-div">
                    <button className="shadow-button" onClick={findPeople}>Find</button>
                </div>
            </div>
            <div className="find-people-list">
                {friends.map((friend, i) => {
                    return (
                        <div className="find-people-person" key={i}>
                            <div className="find-people-person-username">{friend.username}</div>
                            <div className="find-people-person-send-request-button-div">
                                <button ref={el => sendRequestButtons.current.push(el)} className="shadow-button scaled-button" onClick={(e)=>sendRequest(e, friend.username)}>Request</button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}