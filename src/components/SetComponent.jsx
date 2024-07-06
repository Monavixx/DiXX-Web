import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import './css/Set.css';
import { useEffectOnLoadUserData } from "../functions/useEffectOnLoadUserData";
import { useGoToLoginIfNotAuthenticated } from "../functions/redirections";
import { useIsAuthenticated } from "../functions/auth";
import LearnComponent from "./LearnComponent";
import { API } from "../API";

export default function SetComponent() {
    const {id} = useParams();
    const [set, setSet] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isLearning, setIsLearning] = useState(false);
    const navigate = useNavigate();
    
    const is_authenticated = useIsAuthenticated();
    

    useGoToLoginIfNotAuthenticated();
    
    useEffectOnLoadUserData(()=>{
        async function inner() {
            setIsLoading(true);
            const [data] = await API.getSet(id);
            setSet(data.data);
            setIsLoading(false);
        }
        if(is_authenticated) inner();
    }, [is_authenticated]);

    function learn() {
        setIsLearning(true);
    }
     
    function datetimeFormat() {
        let res = set.create_datetime.split('.')[0];
        res = res.split('T').join(' ');
        return res;
    }

    function removeSet() {
        API.removeSet(set.id).then(()=>{
            //navigate('/sets/your');
            setSet(prev => ({...prev, is_your_one:false}));
        });
    }
    function editSet() {
        navigate('edit');
    }
    function addSet() {
        API.addSet(set.id).then(()=>{
            setSet(prev => ({...prev, is_your_one:true}));
        });
    }
    /*
    function addRemoveSet(e) {
        e.preventDefault();
        if(e.target.checked) {
            addSet();
        }
        else {
            removeSet();
        }
    }*/


    if(isLoading) return "Loading...";

    if(isLearning) {
        return <LearnComponent setId={set.id}/>
    }


    return (
        <div className="set-info-container">
            <h1>{set.name}</h1>
            <div className="set-info-label-description">Description</div>
            <div className="set-info-description">{set.description}</div>
            <div className="set-info-words-and-author">
                <div className="set-info-number-and-is-private">
                    <div className="set-info-number-of-cards">The set contains {set.numberOfCards} cards</div>
                    <div className="set-info-is-private">Visibility: {set.visibility === 0 ? 'Private' : 'Public'}</div>
                </div>
                <div className="set-info-author-and-datetime">
                    <div className="set-info-author">Created by <span>{set.author}</span></div>
                    <div className="set-info-at">{`at ${datetimeFormat()}`}</div>
                </div>
            </div>
            <div className="set-buttons-container">
                <button className="set-button-learn shadow-button" onClick={learn} >Learn</button>
                <button className="set-button-edit shadow-button" onClick={editSet}>Edit</button>
                { set.is_your_one ?
                    <button className="set-button-remove shadow-button" onClick={removeSet}>Remove</button>
                :
                    <button className="set-button-add shadow-button" onClick={addSet}>Add</button>
                }
            </div>
            {/*<div>
                <label htmlFor="isYourOne">add/remove</label>
                <input type="checkbox" id='isYourOne' checked={set.is_your_one} onChange={addRemoveSet} />
            </div>*/}
        </div>
    );
}