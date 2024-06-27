import { useEffect, useState } from "react";
import { API } from "../API";
import { Link, useNavigate, useParams } from "react-router-dom";
import AddCardComponent from "./AddCardComponent";
import { useGoToLoginIfNotAuthenticated } from "../functions/redirections";


export default function EditSetComponent() {
    const [set, setSet] = useState(null);
    const [cards, setCards] = useState([]);
    const {id} = useParams();

    const [isLoading, setIsLoading] = useState(true);
    const [message, setMessage] = useState('');

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
        }).catch(()=>{})
        .finally(()=> {});
    },[]);

    function editSet() {
        API.editSet(id, set.name, set.description, set.is_private).then(()=> {
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

    function handleChange(e) {
        setSet( prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    }

    function handleCheckboxChange(e) {
        setSet( prev => ({
            ...prev,
            [e.target.name]: e.target.checked
        }));
    }

    function deleteCard(e) {
        const cardId = Number(e.target.getAttribute('card-id'));
        API.deleteCard(cardId).then(()=> {
            setCards(prev => {
                return prev.filter((v, i) => v.id !== cardId);
            });
        });
    }

    if(isLoading) return 'Loading...';

    return (
        <>
            <div> 
                <input type="text" value={set.name} placeholder="name" name='name' onChange={handleChange}/>
                <textarea placeholder="description" name='description' onChange={handleChange} defaultValue={set.description}></textarea>
                <input type="checkbox" checked={set.is_private} name='is_private' onChange={handleCheckboxChange}/>
                <button onClick={editSet}>Apply</button>
                <div>{message}</div>
            </div>
            <div>
                {/*<Link to={`/set/${id}/add-card/`}><button>Fast add cards</button></Link>*/}
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
        </>
    );
}