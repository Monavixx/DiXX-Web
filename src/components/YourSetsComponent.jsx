import { useState } from "react";
import { get_request_json } from "../functions/send_request";
import { Link } from "react-router-dom";
import './css/YourSets.css';
import { useEffectOnLoadUserData, useLayoutEffectOnLoadUserData } from '../functions/useEffectOnLoadUserData';
import { useIsAuthenticated } from "../functions/auth";
import { useGoToLoginIfNotAuthenticated } from "../functions/redirections";

export default function YourSetsComponent() {
    const [sets, setSets] = useState([]);
    const is_authenticated = useIsAuthenticated();

    useGoToLoginIfNotAuthenticated();

    useLayoutEffectOnLoadUserData(()=>{
        async function inner() {
            const [_data, http_status_code] = await get_request_json('cards/sets/my/');
            if(http_status_code === 200)
                setSets(_data);
        };
        if(is_authenticated) inner();
    },[is_authenticated]);
    

    function formatDescription(d) {
        const MAX_LENGTH = 60;
        if(d.length <= MAX_LENGTH) return d;
        return d.slice(0, MAX_LENGTH).trim() + '...';
    }

    return (
        <div className="your-sets">
            <h1>Your sets</h1>
            <div className="your-sets-container">
                { sets.map((e, i) => { return (
                    <div className="your-sets-set" key={i}>
                        <h2><Link to={`/set/${e.id}`}>{e.name}</Link></h2>
                        <p className="your-sets-set-description">{formatDescription(e.description)}</p>
                        <div className="your-sets-button-and-created-by">
                            <div className="your-sets-set-div-link"><Link className="your-sets-set-link" to={`/set/${e.id}`}><button>Open</button></Link></div>
                            <div className="your-sets-set-created-by-and-number-of-cards">
                                <div>{e.numberOfCards} words</div>
                                <div>*Created by <span className="your-sets-set-author">{e.author}</span></div>
                                
                            </div>
                        </div>
                    </div>)
                })}
            </div>
        </div>
    );
}