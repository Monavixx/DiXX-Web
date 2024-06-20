import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { get_request } from "../functions/send_request";

export default function SetComponent() {
    const {id} = useParams();
    const [set, setSet] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(()=>{
        async function inner() {
            setIsLoading(true);
            const _data = await (await get_request(`cards/my-sets/${id}/`)).json();
            setSet(_data);
            setIsLoading(false);
        }
        inner();
    }, []);
    if(isLoading) return "Loading...";
    return (
        <>
        <h1>Set {set.name}</h1>
        </>
    );
}