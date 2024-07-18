
import {useSelector} from 'react-redux';
import { RootState } from '../store.ts';


export function useIsAuthenticated() {
    return useSelector<RootState, boolean>(state=>state.user.is_authenticated);
}
export function useIsPending() {
    return useSelector<RootState, boolean>(state=>state.user.is_pending);
}
