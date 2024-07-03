import { useRef, useState } from "react";
import { API } from "../API";
import { useNavigate } from "react-router-dom";
import { useGoToLoginIfNotAuthenticated } from "../functions/redirections";
import './css/CreateNewSet.css';

export default function CreateNewSetComponent() {
    const nameInput = useRef(null);
    const descriptionInput = useRef(null);
    const visibilityInput = useRef(null);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    useGoToLoginIfNotAuthenticated();
    
    function createNewSet() {
        API.createNewSet({
            name: nameInput.current.value,
            description: descriptionInput.current.value,
            is_private: visibilityInput.current.value
        }).then(([data]) => {
            navigate(`/set/${data.data.id}`);
        }).catch(([data]) => {
            setMessage(Object.entries(data.errors).map(([k, v])=>{
                return k + ': ' + v + '; ';
            }));
        });
    }

    return (
        <>
            <div className="create-new-set">
                <h1>Create new set</h1>
                <div className="create-new-set-inputs">
                    <table cellPadding='3'>
                        <tbody>
                            <tr>
                                <td>Name:</td>
                                <td>
                                    <input className="input" ref={nameInput} type="text" placeholder="name"/>
                                </td>
                            </tr>
                            <tr>
                                <td>Description:</td>
                                <td>
                                    <textarea className="input" ref={descriptionInput} placeholder="description"></textarea>
                                </td>
                            </tr>
                            <tr>
                                <td>Visibility:</td>
                                <td>
                                    <select className="input" ref={visibilityInput}>
                                        <option value={false}>Public</option>
                                        <option value={true}>Private</option>
                                    </select>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="create-new-set-button-div">
                    <button className="shadow-button" onClick={createNewSet}>Create</button>
                </div>
                <div>{message}</div>
            </div>
        </>
    );
}