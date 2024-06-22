import { useState } from "react";
import { get_request } from "../functions/send_request";
import { Link } from "react-router-dom";
import './css/YourSets.css';
import { useEffectOnLoadUserData } from '../functions/useEffectOnLoadUserData';
import { useIsAuthenticated } from "../functions/auth";
import { useGoToLoginIfNotAuthenticated } from "../functions/redirections";

export default function YourSetsComponent() {
    const [sets, setSets] = useState([]);
    const is_authenticated = useIsAuthenticated();

    useGoToLoginIfNotAuthenticated();

    useEffectOnLoadUserData(()=>{
        async function inner() {
            const _data = await (await get_request('cards/sets/my/')).json();
            setSets(_data);
        };
        if(is_authenticated) inner();
    },[]);

    return (
        <div className="your-sets">
            <h1>Your sets</h1>
            <div className="your-sets-container">
                {sets.map((e, i) => { return (
                    <div className="your-sets-set" key={i}>
                        <h2><Link to={`/sets/${e.id}`}>{e.name}</Link></h2>
                        <p className="your-sets-set-description">{e.description.slice(0, 200)}</p>
                        <div className="your-sets-button-and-created-by">
                            <div className="your-sets-set-div-link"><Link className="your-sets-set-link" to={`/sets/${e.id}`}><button>Open</button></Link></div>
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