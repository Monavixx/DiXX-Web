import { useEffect, useRef, useState } from "react";
import { API } from "../API";
import { useParams } from "react-router-dom";
import AddCardComponent from "./AddCardComponent";
import { useGoToLoginIfNotAuthenticated } from "../functions/redirections";
import './css/EditSet.css';

export default function EditSetComponent() {
    const [set, setSet] = useState(null);
    const [cards, setCards] = useState([]);
    const {id} = useParams();

    const [isLoading, setIsLoading] = useState(true);
    const [message, setMessage] = useState('');

    const nameInput = useRef(null);
    const descriptionInput = useRef(null);
    const visibilityInput = useRef(null);

    useGoToLoginIfNotAuthenticated();

    useEffect(()=> {
        setIsLoading(true);
        API.getSetAndItsCards(id).then(([data]) => {
            setSet({
                name: data.data.name,
                description: data.data.description,
                is_private: data.data.is_private
            });
            setCards(data.data.card_set);
            setIsLoading(false);
            console.log(nameInput.current);
        });
    },[id]);

    function editSet() {
        const newSet = {
            name: nameInput.current.value,
            description: descriptionInput.current.value,
            is_private: visibilityInput.current.value
        };
        setSet(newSet);
        API.editSet(id, newSet.name, newSet.description, newSet.is_private).then(()=> {
            setMessage('success');
        }).catch(([data,status])=> {
            if(status === 403)
                setMessage(data.message);
            else {
                setMessage(Object.entries(data.errors).map(([k, v]) => {
                    return k + ': ' + v + '; ';
                }));
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
                                <select ref={visibilityInput} className="input" defaultValue={set.is_private}>
                                    <option value={false}>Public</option>
                                    <option value={true}>Private</option>
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
            <hr width='90%' color='30, 30, 30' />
            <div>
                <AddCardComponent setCards={setCards}/>
            </div>
            <div>
                {cards?.map(v => {
                return (
                    <div>
                        <div>{v.first} - {v.second}</div>
                        <button onClick={deleteCard} card-id={v.id}>Delete</button>
                    </div>
                )})}
            </div>
        </div>
    );
}