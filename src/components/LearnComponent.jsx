import { useCallback, useEffect, useState } from "react";
import { API } from "../API";



export default function LearnComponent({setId}) {
    const [isShowSecond, setIsShowSecond] = useState(false);
    const [card, setCard] = useState(null);

    function toggleSecond() {
        setIsShowSecond(!isShowSecond);
    }
    const nextCard = useCallback(() => {
        async function inner() {
            setIsShowSecond(false);
            const [data] = await API.learn(setId);
            setCard(data.data);
        }
        inner();
    }, [setId]);

    useEffect(()=>{
        nextCard();
    }, [nextCard]);

    return (
        <div className="card-learn">
            <div className="card-learn-text">
                <div className="card-learn-first">{card?.first}</div>
                <div className="card-learn-second">{ isShowSecond ? card?.second : ''}</div>
            </div>
            <div className="card-learn-buttons">
                {isShowSecond ?
                    <button className="card-learn-button card-learn-button-hide" onClick={toggleSecond}>Hide</button>
                    :
                    <button className="card-learn-button card-learn-button-show" onClick={toggleSecond}>Show</button>
                }
                <button className="card-learn-button card-learn-button-next" onClick={nextCard}>Next</button>
            </div>
        </div>
    );
}