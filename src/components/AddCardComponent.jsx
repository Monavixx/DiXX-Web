import { useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { API } from "../API";


export default function AddCardComponent({setCards}) {
    const {id:idSet} = useParams();
    const firstInput = useRef(null);
    const secondInput = useRef(null);
    const [errors, setErrors] = useState(null);
    const navigate = useNavigate();

    function addCard() {
        const first = firstInput.current.value;
        const second = secondInput.current.value;

        API.addCard(idSet, first, second)
        .then(([data, status]) => {
            setCards(prev=>[...prev, {first: data.data.first, second: data.data.second, id:data.data.id}])
            //clear all inputs and states
            firstInput.current.value='';
            secondInput.current.value='';
            setErrors([]);
        }).catch(([data,status])=> {
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
                <input ref={firstInput} type="text" placeholder="word" onKeyDown={keyDown}/>
                <input ref={secondInput} type="text" placeholder="meaning" onKeyDown={keyDown}/>
                <button onClick={addCard}>Add</button>
                <div>{errors !== null && Object.entries(errors).map((k,v)=>{return k + ': ' + v + '; ';})}</div>
            </div>
        </>
    );
}