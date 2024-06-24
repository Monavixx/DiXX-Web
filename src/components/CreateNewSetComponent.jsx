import { useRef, useState } from "react";
import { API } from "../API";


export default function CreateNewSetComponent() {
    const nameInput = useRef(null);
    const descriptionInput = useRef(null);
    const isPrivateInput = useRef(null);
    const [message, setMessage] = useState('');
    
    function createNewSet() {
        async function inner() {
            const [, status] = await API.createNewSet({
                name: nameInput.current.value,
                description: descriptionInput.current.value,
                is_private: isPrivateInput.current.checked
            });
            if(status === 200) {
                setMessage('Success!');
            }
        }
        inner();
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