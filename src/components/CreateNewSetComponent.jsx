import { useRef, useState } from "react";
import { API } from "../API";
import { useNavigate } from "react-router-dom";
import { useGoToLoginIfNotAuthenticated } from "../functions/redirections";


export default function CreateNewSetComponent() {
    const nameInput = useRef(null);
    const descriptionInput = useRef(null);
    const isPrivateInput = useRef(null);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    useGoToLoginIfNotAuthenticated();
    
    function createNewSet() {
        API.createNewSet({
            name: nameInput.current.value,
            description: descriptionInput.current.value,
            is_private: isPrivateInput.current.checked
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
            <dir>{message}</dir>
            <div className="create-new-set-inputs">
                <input ref={nameInput} type="text" placeholder="name"/>
                <textarea ref={descriptionInput} placeholder="description"></textarea>
                <label htmlFor="isPrivate">Private </label><input ref={isPrivateInput} id="isPrivate" type="checkbox" />
                <button onClick={createNewSet}>Create</button>
            </div>
        </>
    );
}