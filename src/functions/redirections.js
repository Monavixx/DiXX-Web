import { createSearchParams, useLocation, useNavigate } from "react-router-dom";
import { useIsAuthenticated } from "./auth";
import { useEffectOnLoadUserData } from "./useEffectOnLoadUserData";


export function useGoToLoginIfNotAuthenticated() {
    const is_authenticated = useIsAuthenticated();
    const navigate = useNavigate();
    const location = useLocation();
    useEffectOnLoadUserData(()=>{
        if(!is_authenticated) {
            navigate({pathname: '/login', search: createSearchParams({'after_login':location.pathname}).toString()});
        }
    });
}

export function useGoToProfileIfAuthenticated() {
    const is_authenticated = useIsAuthenticated();
    const navigate = useNavigate();
    useEffectOnLoadUserData(()=>{
        if(is_authenticated) {
            navigate('/profile');
        }
    },[]);
}