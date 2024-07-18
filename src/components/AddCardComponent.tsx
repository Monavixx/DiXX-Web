import React, { useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { API } from "../API";
import './css/AddCard.css';


export default function AddCardComponent({setCards}) {
    const {id:idSet} = useParams();
    const firstInput = useRef<HTMLInputElement>(null);
    const secondInput = useRef<HTMLInputElement>(null);
    const [errors, setErrors] = useState<any[]>([]);
    const navigate = useNavigate();

    function addCard() {
        const first = firstInput.current!.value;
        const second = secondInput.current!.value;

        API.addCard(idSet, first, second)
        .then(([data, status]) => {
            setCards(prev=>[...prev, {first: data.data.first, second: data.data.second, id:data.data.id}])
            //clear all inputs and states
            firstInput.current!.value='';
            secondInput.current!.value='';
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
            <div className="add-card">
                <table cellPadding='2'>
                    <tbody>
                        <tr>
                            <td>Front:</td>
                            <td>
                                <input className="input" ref={firstInput} type="text" placeholder="word" onKeyDown={keyDown}/>
                            </td>
                        </tr>
                        <tr>
                            <td>Back:</td>
                            <td>
                                <input className="input" ref={secondInput} type="text" placeholder="meaning" onKeyDown={keyDown}/>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div className="add-card-button-div">
                    <button className="shadow-button" onClick={addCard}>Add</button>
                </div>
                <div className="add-card-message">{errors !== null && Object.entries(errors).map((k,v)=>{return k + ': ' + v + '; ';})}</div>
            </div>
        </>
    );
}