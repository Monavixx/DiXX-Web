import { createSearchParams, useLocation, useNavigate } from "react-router-dom";
import { useIsAuthenticated } from "./auth";
import { useLayoutEffectOnLoadUserData } from "./useEffectOnLoadUserData";


export function useGoToLoginIfNotAuthenticated() {
    const is_authenticated = useIsAuthenticated();
    const navigate = useNavigate();
    const location = useLocation();
    console.log('usegoto called');
    useLayoutEffectOnLoadUserData(()=>{
        if(!is_authenticated) {
            navigate({pathname: '/login', search: createSearchParams({'after_login':location.pathname}).toString()});
        }
    }, [is_authenticated]);
}

export function useGoToProfileIfAuthenticated() {
    const is_authenticated = useIsAuthenticated();
    const navigate = useNavigate();
    useLayoutEffectOnLoadUserData(()=>{
        if(is_authenticated) {
            navigate('/profile');
        }
    },[]);
}