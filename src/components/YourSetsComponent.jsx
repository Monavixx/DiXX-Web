import { useEffect, useState } from "react";
import { get_request } from "../functions/send_request";
import { Link } from "react-router-dom";

export default function YourSetsComponent() {
    const [sets, setSets] = useState([]);

    useEffect(()=>{
        async function inner() {
            const _data = await (await get_request('cards/my-sets/')).json();
            setSets(_data);
        };
        inner();
    },[]);

    return (
        <>
        <h1>Your sets</h1>
        <div className="containerOfSets">
            {sets.map((e, i) => { return (
                <div className="set" key={i}>
                    <Link to={`/your-sets/${e.id}`}><h2>{e.name}</h2></Link>
                    <p>created by {e.author}</p>
                    <p>{e.description.slice(0, 200)}</p>
                </div>)
            })}
        </div>
        </>
    );
}