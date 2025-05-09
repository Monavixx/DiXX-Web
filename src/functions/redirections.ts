import { createSearchParams, useLocation, useNavigate } from "react-router-dom";
import { useIsAuthenticated } from "./auth.ts";
import { useLayoutEffectOnLoadUserData } from "./useEffectOnLoadUserData.ts";


export function useGoToLoginIfNotAuthenticated() {
    const is_authenticated = useIsAuthenticated();
    const navigate = useNavigate();
    const location = useLocation();
    useLayoutEffectOnLoadUserData(()=>{
        if(!is_authenticated) {
            navigate({pathname: '/login', search: createSearchParams({'after_login':location.pathname}).toString()});
        }
    }, [is_authenticated]);
}

export function useGoToProfileIfAuthenticated(allow=true) {
    const is_authenticated = useIsAuthenticated();
    const navigate = useNavigate();
    useLayoutEffectOnLoadUserData(()=>{
        if(is_authenticated && allow) {
            navigate('/profile');
        }
    },[is_authenticated, allow]);
}