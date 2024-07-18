import React, { useState } from "react"
import { useEffectOnLoadUserData } from "../../functions/useEffectOnLoadUserData.ts";
import { useGoToLoginIfNotAuthenticated } from "../../functions/redirections.ts";
import { API } from "../../API.js";

export default function RequestsToMeListComponent() {
    const [requests, setRequests] = useState<any[]>([]);

    useGoToLoginIfNotAuthenticated();
    useEffectOnLoadUserData(()=> {
        reloadRequests();
    }, []);

    function reloadRequests() {
        API.getFriendRequests().then(([data, status]) => {
            if(status === 200) {
                setRequests(data.data);
            }
        });
    }

    function acceptRequest(e, request_id) {
        API.acceptFriendRequest(request_id).then(([,status])=> {
            if(status===200) {
                reloadRequests();
            }
        });
    }

    return (
        <div className="requests-to-me">
            {requests.length > 0 ? requests.map((r, i) => {
                return (
                    <div key={i} className="requests-to-me-request">
                        <div className="requests-to-me-request-username">{r.sender.username}</div>
                        <div className="requests-to-me-request-accept-button-div">
                            <button className="shadow-button scaled-button" onClick={(e)=>acceptRequest(e, r.id)}>Accept</button>
                        </div>
                    </div>
                );
                })
                :
                "There aren't requests to you ;("
            }
        </div>
    )
}