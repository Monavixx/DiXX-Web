import React, { useRef, useState } from "react";
import { API } from "../../API";

export default function FindPeopleComponent() {
    const usernameInput = useRef<HTMLInputElement>(null);
    const lastUsername = useRef<string|null>(null);
    const [people, setPeople] = useState<any[]>([]);


    function findPeople(query?:string) {
        if(usernameInput.current!.value.trim().length <= 0 && (query===undefined || query!.trim().length <= 0)) return;
        if(usernameInput.current!.value.trim().length > 0) lastUsername.current = usernameInput.current!.value;
        else lastUsername.current = query!;

        API.findPeople(lastUsername.current).then(([data, status])=> {
            if(status === 200) {
                setPeople(data.data);
            }
        });
    }

    function sendRequest(username) {
        API.sendFriendRequest(username).then(([,status])=>{
            if(status === 200) {
                findPeople(lastUsername.current!);
            }
        });
    }

    function acceptRequest(request_id) {
        API.acceptFriendRequest(request_id).then(([,status])=> {
            if(status===200) {
                findPeople(lastUsername.current!);
            }
        });
    }

    function unfriend(username) {
        API.unfriend(username).then(([,status])=> {
            if(status===200) {
                findPeople(lastUsername.current!);
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
                    <button className="shadow-button scaled-button" onClick={()=>findPeople()}>Find</button>
                </div>
            </div>
            <div className="find-people-list">
                {people.map((person, i) => {
                    return (
                        <div className="find-people-person" key={i}>
                            <div className="find-people-person-username">{person.username}</div>

                            <div className="find-people-person-send-request-button-div">
                                {person.friendship.status === 0 ?
                                    <button className="shadow-button scaled-button" onClick={()=>sendRequest(person.username)}>Request</button>
                                : (person.friendship.status === 1 ?
                                    <button className="shadow-button scaled-button" disabled>Sent</button>
                                :(person.friendship.status === 2 ?
                                    <button className="shadow-button scaled-button" onClick={()=>acceptRequest(person.friendship.request.id)}>Accept</button>
                                :(person.friendship.status === 3 && 
                                    <button className="shadow-button scaled-button" onClick={()=>unfriend(person.username)}>Unfriend</button>
                                )))}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}