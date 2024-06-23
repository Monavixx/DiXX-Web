
import {useSelector} from 'react-redux';


export function useIsAuthenticated() {
    return useSelector(state=>state.user.is_authenticated);
}
