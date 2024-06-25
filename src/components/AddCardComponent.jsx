import { useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { API } from "../API";


export default function AddCardComponent() {
    const {id:idSet} = useParams();
    const word = useRef(null);
    const meaning = useRef(null);
    const [errors, setErrors] = useState(null);
    const navigate = useNavigate();

    function addCard() {
        API.addCard(idSet, word.current.value, meaning.current.value)
        .then(() => {
            //clear all inputs and states
            word.current.value='';
            meaning.current.value='';
            setErrors([]);
        }).catch(([,status,data])=> {
            if(status === 403) {
                navigate(`/set/${idSet}/`);
            }
            else {
                setErrors(data.errors);
            }
        });
    }

    function keyDown(e) {
        if(e.key==='Enter')
            addCard();
    } 

    return (
        <>
            <div>
                <input ref={word} type="text" placeholder="word" onKeyDown={keyDown}/>
                <input ref={meaning} type="text" placeholder="meaning" onKeyDown={keyDown}/>
                <button onClick={addCard}>Add</button>
                <div>{errors !== null && Object.entries(errors).map((k,v)=>{return k + ': ' + v + '; ';})}</div>
            </div>
        </>
    );
}