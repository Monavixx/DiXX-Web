import { useEffect, useState } from "react";
import { API } from "../API";
import { Link, useNavigate, useParams } from "react-router-dom";


export default function EditSetComponent() {
    const [set, setSet] = useState(null);
    const {id} = useParams();

    const [isLoading, setIsLoading] = useState(true);
    const [message, setMessage] = useState('');

    const navigate = useNavigate();

    useEffect(()=> {
        API.getSet(id).then(([data]) => {
            console.log(data);
            setSet({name: data.name, description: data.description, is_private: data.is_private});
        }).finally(()=> {
            setIsLoading(false);
        });
    },[]);

    function editSet() {
        API.editSet(id, set.name, set.description, set.is_private).then((data)=> {
            setMessage('success');
        }).catch(([,status,data])=> {
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
                <Link to={`/set/${id}/add-card/`}><button>Fast add cards</button></Link>
            </div>
        </>
    );
}