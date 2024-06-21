import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { get_request } from "../functions/send_request";

export default function SetComponent() {
    const {id} = useParams();
    const [set, setSet] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isLearning, setIsLearning] = useState(false);
    const [card, setCard] = useState(null);
    const [isShowSecond, setIsShowSecond] = useState(false);
    
    useEffect(()=>{
        async function inner() {
            setIsLoading(true);
            const _data = await (await get_request(`cards/sets/${id}/`)).json();
            setSet(_data);
            setIsLoading(false);
        }
        inner();
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
        <div>
            <h1>{set.name}</h1>
            <p>Description: {set.description}</p>
            <p>{`(created by ${set.author} at ${set.create_datetime})`}</p>
            <button onClick={learn}>Learn</button>
        </div>
    );
}