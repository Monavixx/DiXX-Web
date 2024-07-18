import React, { useState } from "react";
import { useEffectOnLoadUserData } from "../../functions/useEffectOnLoadUserData.ts";
import { API } from "../../API.js";


export default function FriendListComponent() {
    const [friends, setFriends] = useState<any[]>([]);

    useEffectOnLoadUserData(()=> {
        reloadFriends();
    },[]);

    function reloadFriends() {
        API.getFriends().then(([data, status])=> {
            if(status===200) {
                setFriends(data.data);
            }
        });
    }

    function unfriend(e, username) {
        e.target.disabled = true;
        API.unfriend(username).then(([,status])=> {
            if(status===200) {
                reloadFriends();
                e.target.disabled = false;
            }
        });
    }

    return (
        <div className="friend-list">
            {friends.map((friend, i) => {return(
                <div className="friend-list-friend" key={friend.id}>
                    <div className="friend-list-friend-username">{`${i+1}) `}{friend.username}</div>
                    <div className="friend-list-friend-unfriend-button-div">
                        <button className="shadow-button scaled-button" onClick={(e)=>unfriend(e, friend.username)}>Unfriend</button>
                    </div>
                </div>
            )})}
        </div>
    );
}