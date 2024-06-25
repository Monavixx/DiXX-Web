import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import './css/Set.css';
import { useEffectOnLoadUserData } from "../functions/useEffectOnLoadUserData";
import { useGoToLoginIfNotAuthenticated } from "../functions/redirections";
import { useIsAuthenticated } from "../functions/auth";
import LearnComponent from "./LearnComponent";
import { API } from "../API";

export default function SetComponent() {
    const {id} = useParams();
    const [set, setSet] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isLearning, setIsLearning] = useState(false);
    const navigate = useNavigate();
    
    const is_authenticated = useIsAuthenticated();
    

    useGoToLoginIfNotAuthenticated();
    
    useEffectOnLoadUserData(()=>{
        async function inner() {
            setIsLoading(true);
            const [_data] = await API.getSet(id);
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

    function removeSet() {
        API.removeSet(set.id).then(()=>{
            navigate('/sets/your');
        })
        .catch(()=>{});
    }
    function editSet() {
        navigate('edit');
    }


    if(isLoading) return "Loading...";

    if(isLearning) {
        return <LearnComponent setId={set.id}/>
    }

    return (
        <div className="set-info-container">
            <h1>{set.name}</h1>
            <div className="set-info-label-description">Description</div>
            <div className="set-info-description">{set.description}</div>
            <div className="set-info-words-and-author">
                <div className="set-info-number-and-is-private">
                    <div className="set-info-number-of-cards">The set contains {set.numberOfCards} words</div>
                    <div className="set-info-is-private">Visibility: {set.is_private ? 'Private' : 'Public'}</div>
                </div>
                <div className="set-info-author-and-datetime">
                    <div className="set-info-author">Created by <span>{set.author}</span></div>
                    <div className="set-info-at">{`at ${datetimeFormat()}`}</div>
                </div>
            </div>
            <div className="set-buttons-container">
                <button className="set-button-learn" onClick={learn}>Learn</button>
                <button className="set-button-edit" onClick={editSet}>Edit</button>
                <button className="set-button-remove" onClick={removeSet}>Remove</button>
            </div>
        </div>
    );
}