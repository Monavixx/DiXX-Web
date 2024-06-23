import { useState } from "react";
import { useParams } from "react-router-dom";
import { get_request_json } from "../functions/send_request";
import './css/Set.css';
import { useEffectOnLoadUserData, useLayoutEffectOnLoadUserData } from "../functions/useEffectOnLoadUserData";
import { useGoToLoginIfNotAuthenticated } from "../functions/redirections";
import { useIsAuthenticated } from "../functions/auth";
import LearnComponent from "./LearnComponent";

export default function SetComponent() {
    const {id} = useParams();
    const [set, setSet] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isLearning, setIsLearning] = useState(false);
    
    const is_authenticated = useIsAuthenticated();
    

    useGoToLoginIfNotAuthenticated();
    
    useLayoutEffectOnLoadUserData(()=>{
        async function inner() {
            setIsLoading(true);
            const [_data] = await get_request_json(`cards/sets/${id}/`);
            setSet(_data);
            setIsLoading(false);
        }
        if(is_authenticated) inner();
    }, [is_authenticated]);

    function learn() {
        setIsLearning(true);
    }
    
    function datetimeFormat() {
        let res = set.create_datetime.split('.')[0];
        res = res.split('T').join(' ');
        return res;
    }


    if(isLoading) return "Loading...";
    if(!set.success) return set.message;

    if(isLearning) {
        return <LearnComponent setId={set.id}/>
    }

    return (
        <div className="set-info-container">
            <h1>{set.name}</h1>
            <div className="set-info-label-description">Description</div>
            <div className="set-info-description">{set.description}</div>
            <div className="set-info-words-and-author">
                <div className="set-info-number-of-cards">The set contains {set.numberOfCards} words</div>
                <div className="set-info-author-and-datetime">
                    <div className="set-info-author">Created by <span>{set.author}</span></div>
                    <div className="set-info-at">{`at ${datetimeFormat()}`}</div>
                </div>
            </div>
            <div className="set-buttons-container">
                <button className="set-button-learn" onClick={learn}>Learn</button>
                <button className="set-button-edit" onClick={()=>{}}>Edit</button>
                <button className="set-button-delete" onClick={()=>{}}>Delete</button>
            </div>
        </div>
    );
}