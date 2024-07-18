import React, { useCallback, useEffect, useRef, useState } from "react";
import { API } from "../API";
import './css/Learn.css';



export default function LearnComponent({setId}) {
    const [isBack, setIsBack] = useState(false);
    const [card, setCard] = useState<any>(null);
    const cardDiv = useRef<HTMLDivElement>(null);

    let timeoutIdToggleSide: number|null = null;

    function toggleSide() {
        clearTimeout(timeoutIdToggleSide!);
        timeoutIdToggleSide = null;

        cardDiv.current!.classList.toggle('card-learn-back');
        timeoutIdToggleSide = setTimeout(() => {
            setIsBack(prev=>!prev);
        }, 250);
    }
    const nextCard = useCallback(() => {
        async function inner() {
            setIsBack(false);
            const [data] = await API.learn(setId);
            setCard(data.data);
        }
        inner();
    }, [setId]);

    useEffect(()=>{
        nextCard();
    }, [nextCard]);

    return (
        <>
        <div className="parent-card-learn">
        <div className="card-learn" ref={cardDiv}>
            <div className="card-learn-text">
                <div className="card-learn-first">{card?.first}</div>
                { isBack && <div className="card-learn-second"> {card?.second} </div> }
            </div>
            <div className="card-learn-buttons">
                {isBack ?
                    <button className="card-learn-button card-learn-button-hide shadow-button scaled-button" onClick={toggleSide}>Hide</button>
                    :
                    <button className="card-learn-button card-learn-button-show shadow-button scaled-button" onClick={toggleSide}>Show</button>
                }
                <button className="card-learn-button card-learn-button-next shadow-button scaled-button" onClick={nextCard}>Next</button>
            </div>
        </div>
        </div>
        </>
    );
}