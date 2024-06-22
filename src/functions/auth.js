import { get_request } from "./send_request";
import {useSelector} from 'react-redux';

export async function logoutRequest() {
    return await (await get_request('logout/')).json();
}

export function useIsAuthenticated() {
    return useSelector(state=>state.user.is_authenticated);
}
