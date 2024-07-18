import React, { useEffect, useRef, useState } from "react";
import { API } from "../API.js";
import { useNavigate } from "react-router-dom";
import { useGoToLoginIfNotAuthenticated } from "../functions/redirections.ts";
import './css/CreateNewSet.css';

export default function CreateNewSetComponent() {
    const nameInput = useRef<HTMLInputElement>(null);
    const descriptionInput = useRef<HTMLTextAreaElement>(null);
    const visibilityInput = useRef<HTMLSelectElement>(null);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const [data, setData] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);

    useGoToLoginIfNotAuthenticated();

    useEffect(() => {
        API.getDataForCreatingSet().then(([data_])=> {
            setData(data_.data);
            setIsLoading(false);
        });
    }, []);
    
    function createNewSet() {
        API.createNewSet({
            name: nameInput.current!.value,
            description: descriptionInput.current!.value,
            visibility: visibilityInput.current!.value
        }).then(([data]) => {
            navigate(`/set/${data.data.id}`);
        }).catch(([data]) => {
            setMessage((Object.entries(data.errors) as [string, string][]).reduce((acc, [k, v])=>{
                return [acc + k + ': ' + v + '; ', ''] as const;
            })[0]);
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
                                        {!isLoading && data!.visibility_choices.map(([v, s]) => {
                                            return <option key={v} value={v}>{s}</option>
                                        })}
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