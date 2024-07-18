import React, { useState } from "react";
import { Link } from "react-router-dom";
import './css/YourSets.css';
import { useLayoutEffectOnLoadUserData } from '../functions/useEffectOnLoadUserData.ts';
import { useIsAuthenticated } from "../functions/auth.ts";
import { useGoToLoginIfNotAuthenticated } from "../functions/redirections.ts";
import { API } from "../API.js";

export default function YourSetsComponent() {
    const [sets, setSets] = useState<any[]>([]);
    const is_authenticated = useIsAuthenticated();

    useGoToLoginIfNotAuthenticated();

    useLayoutEffectOnLoadUserData(()=>{

        if(is_authenticated) {
            API.getYourSets().then(([data]) => {
                setSets(data.data);
            }).catch(()=>{});
        }
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
                    <div className="your-sets-set" key={e.id}>
                        <h2><Link to={`/set/${e.id}`}>{e.name}</Link></h2>
                        <p className="your-sets-set-description">{formatDescription(e.description)}</p>
                        <div className="your-sets-button-and-created-by">
                            <div className="your-sets-set-div-link"><Link className="your-sets-set-link" to={`/set/${e.id}`}><button className="shadow-button">Open</button></Link></div>
                            <div className="your-sets-set-created-by-and-number-of-cards">
                                <div>{e.numberOfCards} cards</div>
                                <div className="your-sets-set-created-by">*Created by <span className="your-sets-set-author">{e.author}</span></div>
                                
                            </div>
                        </div>
                    </div>)
                })}
            </div>
        </div>
    );
}