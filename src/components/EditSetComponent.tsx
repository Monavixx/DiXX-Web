import React, { useEffect, useRef, useState } from "react";
import { API } from "../API.js";
import { useParams } from "react-router-dom";
import AddCardComponent from "./AddCardComponent.tsx";
import { useGoToLoginIfNotAuthenticated } from "../functions/redirections.ts";
import './css/EditSet.css';

export default function EditSetComponent() {
    const [set, setSet] = useState<any>(null);
    const [cards, setCards] = useState<any[]>([]);
    const {id} = useParams();

    const [isLoading, setIsLoading] = useState(true);
    const [message, setMessage] = useState('');
    const [visibilityChoices, setVisibilityChoices] = useState<any[]>([]);

    const nameInput = useRef<HTMLInputElement>(null);
    const descriptionInput = useRef<HTMLTextAreaElement>(null);
    const visibilityInput = useRef<HTMLSelectElement>(null);

    useGoToLoginIfNotAuthenticated();

    useEffect(()=> {
        setIsLoading(true);
        API.getSetAndItsCards(id).then(([data]) => {
            setSet({
                name: data.data.name,
                description: data.data.description,
                visibility: data.data.visibility
            });
            setCards(data.data.card_set);
            setVisibilityChoices(data.data.visibility_choices);
            setIsLoading(false);
        });
    },[id]);

    function editSet() {
        const newSet = {
            name: nameInput.current!.value,
            description: descriptionInput.current!.value,
            visibility: visibilityInput.current!.value
        };
        setSet(newSet);
        API.editSet(id, newSet.name, newSet.description, newSet.visibility).then(()=> {
            setMessage('success');
        }).catch(([data,status])=> {
            if(status === 403)
                setMessage(data.message);
            else {
                setMessage((Object.entries(data.errors as any[]) as [string, string][]).reduce((acc, [k, v]) => {
                    return [acc + k + ': ' + v + '; ', ''] as const;
                })[0]);
            }
        });
    }

    function deleteCard(e) {
        const cardId = Number(e.target.getAttribute('card-id'));
        API.deleteCard(cardId).then(()=> {
            setCards(prev => {
                return prev.filter((v, i) => v.id !== cardId);
            });
        });
    }

    function handleEnter(e) {
        if(e.key === 'Enter') {
            editSet();
        }
    }

    if(isLoading) return 'Loading...';

    return (
        <div className="edit-set">
            <h1>Edit set</h1>
            <div className="edit-set-inputs">
                <table cellPadding='3'>
                    <tbody>
                        <tr>
                            <td>Name:</td>
                            <td>
                                <input ref={nameInput} className="input" type="text" defaultValue={set.name} placeholder="name" onKeyDown={handleEnter}/>
                            </td>
                        </tr>
                        <tr>
                            <td>Description:</td>
                            <td>
                                <textarea ref={descriptionInput} className="input" defaultValue={set.description} placeholder="description" onKeyDown={handleEnter} ></textarea>
                            </td>
                        </tr>
                        <tr>
                            <td>Visibility:</td>
                            <td>
                                <select ref={visibilityInput} className="input" defaultValue={set.visibility}>
                                    {visibilityChoices.map(([v, s]) => {
                                        return <option key={v} value={v}>{s}</option>
                                    })}
                                </select>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="edit-set-apply-button-div">
                <button className="shadow-button" onClick={editSet}>Apply</button>
            </div>
            <div>{message}</div>
            <hr style={{width:'90%'}} color='30, 30, 30' />
            
            <AddCardComponent setCards={setCards}/>
            {cards.length > 0 &&
            <div className="edit-set-list-of-cards">
                <h2>
                    List of cards
                </h2>
                
                <table cellPadding='3'>
                    <thead>
                        <tr>
                            <td>Front</td>
                            <td>Back</td>
                        </tr>
                    </thead>
                    <tbody>
                        {cards?.map((v, i) => {
                        return (
                            <tr key={i}>
                                <td><div>{v.first}</div></td>
                                <td><div>{v.second}</div></td>
                                <td>
                                    <button className="edit-set-delete-card-button scaled-button shadow-button" onClick={deleteCard} card-id={v.id}>Delete</button>
                                </td>
                            </tr>
                        )})}
                    </tbody>
                </table>
            </div>
            }
        </div>
    );
}