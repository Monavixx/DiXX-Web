import { store } from "./index.jsx";
import { get_request_json } from "./functions/send_request";
import { loginAction, logoutAction, pending } from "./slices/userReducer.js";

export const API = {
    checkForLogin: async ()=> {
        store.dispatch(pending(true));
        const [_data] = await get_request_json('login/');
        if(_data.is_authenticated) {
            store.dispatch(loginAction({
              name:_data.username,
              email:_data.email
            }));
        }
        else {
          store.dispatch(logoutAction());
        }
    },
}