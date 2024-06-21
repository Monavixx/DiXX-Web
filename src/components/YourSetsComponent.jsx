import { useEffect, useState } from "react";
import { get_request } from "../functions/send_request";
import { Link } from "react-router-dom";
import './YourSets.css';

export default function YourSetsComponent() {
    const [sets, setSets] = useState([]);

    useEffect(()=>{
        async function inner() {
            const _data = await (await get_request('cards/sets/my/')).json();
            setSets(_data);
        };
        inner();
    },[]);

    return (
        <div className="your-sets">
            <h1>Your sets</h1>
            <div className="your-sets-container">
                {sets.map((e, i) => { return (
                    <div className="your-sets-set" key={i}>
                        <h2><Link to={`/sets/${e.id}`}>{e.name}</Link></h2>
                        <p>*Created by <span className="your-sets-set-author">{e.author}</span></p>
                        <p>{e.description.slice(0, 200)}</p>
                        <Link className="your-sets-set-link" to={`/sets/${e.id}`}><button>Open</button></Link>
                    </div>)
                })}
            </div>
        </div>
    );
}