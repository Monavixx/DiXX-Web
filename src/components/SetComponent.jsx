import { useState } from "react";
import { useParams } from "react-router-dom";
import { get_request } from "../functions/send_request";
import './css/Set.css';
import { useEffectOnLoadUserData } from "../functions/useEffectOnLoadUserData";
import { useGoToLoginIfNotAuthenticated } from "../functions/redirections";
import { useIsAuthenticated } from "../functions/auth";

export default function SetComponent() {
    const {id} = useParams();
    const [set, setSet] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isLearning, setIsLearning] = useState(false);
    const [card, setCard] = useState(null);
    const [isShowSecond, setIsShowSecond] = useState(false);
    const is_authenticated = useIsAuthenticated();
    

    useGoToLoginIfNotAuthenticated();
    
    useEffectOnLoadUserData(()=>{
        async function inner() {
            setIsLoading(true);
            const _data = await (await get_request(`cards/sets/${id}/`)).json();
            setSet(_data);
            setIsLoading(false);
        }
        if(is_authenticated) inner();
    }, []);

    function learn() {
        setIsLearning(true);
        nextCard();
    }

    function nextCard() {
        
        async function inner() {
            setIsShowSecond(false);
            const _data = await (await get_request(`cards/sets/${set.id}/random-learn/`)).json();
            setCard(_data);
        }
        inner();
    }
    function showSecond() {
        setIsShowSecond(true);
    }
    function datetimeFormat() {
        let res = set.create_datetime.split('.')[0];
        res.replace('T',' ');
        return res;
    }


    if(isLoading) return "Loading...";
    if(!set.success) return set.message;

    if(isLearning) {
        return (
            <div>
                <p>{card?.first}</p>
                {isShowSecond && <p>{card?.second}</p>}
                <button onClick={showSecond}>Show</button>
                <button onClick={nextCard}>Next</button>
            </div>
        );
    }

    return (
        <div className="set-info-container">
            <h1>{set.name}</h1>
            <div className="set-info-label-description">Description</div>
            <div className="set-info-description">{set.description}</div>
            <div>{`Created by ${set.author}`}</div>
            <div className="set-info-at">{`at ${datetimeFormat()}`}</div>
            <button onClick={learn}>Learn</button>
        </div>
    );
}