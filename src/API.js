import { store } from "./index.jsx";
import { get_request_json, post_request_json } from "./functions/send_request";
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
    createNewSet: async({name, description, is_private}) => {
      return await post_request_json('cards/create-new-set/', {
        name: name,
        description: description,
        is_private: is_private
      });
    },

    learn: async(setId)=>{
      return await get_request_json(`cards/set/${setId}/random-learn/`);
    },
    /**This function returns a promise. Resolve if success authentication, reject if not. */
    login: async(username, password)=> {

      store.dispatch(pending(true));
      const [_data] = await post_request_json('login/',{username:username, password:password});
      
      return new Promise((resolve, reject) => {
        if(_data.is_authenticated) {
          store.dispatch(loginAction({name:_data.username,
            email:_data.email
          }));
          resolve(_data);
        }
        else {
          store.dispatch(pending(false));
          reject(_data);
        }
      });
    },

    logout: async()=>{
      store.dispatch(pending(true));
      await get_request_json('logout/');
      store.dispatch(logoutAction());
    },

    getSet: async(id) => {
      return get_request_json(`cards/set/${id}/`)
    },

    signUp: async (username, email, password) => {
      return post_request_json('signup/', {
        username: username,
        email: email,
        password: password
      }).then(([_data])=>{
        return new Promise((resolve, reject)=>{
          if(_data.success) {
            resolve(_data);
          }
          else {
            reject(_data);
          }
        });
      });
    }
}