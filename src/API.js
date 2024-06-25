import { store } from "./index.jsx";
import { get_request_json, post_request_json, put_request_json } from "./functions/send_request";
import { loginAction, logoutAction, pending } from "./slices/userReducer.js";

export const API = {
    checkForLogin: async ()=> {
        store.dispatch(pending(true));
        const [_data, status] = await get_request_json('login/');
        if(status === 200) {
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
      return post_request_json('cards/create-new-set/', {
        name: name,
        description: description,
        is_private: is_private
      })
      .then(([data, status]) => {
        return new Promise((resolve, reject)=>{
          console.log(data);
          if(status === 201) {
            resolve(data);
          }
          else {
            reject(data);
          }
        });
      },
      ([data])=>{});
    },

    learn: async(setId)=>{
      return await get_request_json(`cards/set/${setId}/random-learn/`);
    },
    /**This function returns a promise. Resolve if success authentication, reject if not. */
    login: async(username, password)=> {

      store.dispatch(pending(true));
      const [_data, status] = await post_request_json('login/',{username:username, password:password});
      
      return new Promise((resolve, reject) => {
        if(status === 200) {
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
      return get_request_json(`cards/set/${id}/`);
    },

    signUp: async (username, email, password) => {
      return post_request_json('signup/', {
        username: username,
        email: email,
        password: password
      }).then(([_data, status])=>{
        return new Promise((resolve, reject)=>{
          if(status === 201) {
            resolve(_data);
          }
          else {
            reject(_data);
          }
        });
      });
    },

    removeSet: async(set_id) => {
      return post_request_json('cards/remove-set/', {set_id:set_id})
      .then(([_data, status]) => {
        return new Promise((resolve, reject)=> {
          if(status === 200) {
            resolve(_data);
          }
          else {
            reject(_data);
          }
        });
      });
    },

    editSet: async(set_id, set_name, set_description, set_is_private) => {
      return put_request_json(`cards/edit-set/${set_id}/`, {
        name: set_name,
        description: set_description,
        is_private: set_is_private
      }).then((data) => {
        return new Promise((resolve, reject) => {
          if(data[1] === 200) {
            resolve(data);
          }
          else {
            reject(data);
          }
        });
      }, ()=>{});
    },
    addCard: async(set_id, first, second) => {
      return post_request_json(`cards/set/${set_id}/add-card/`, {
        first: first,
        second: second
      }).then((data) => {
        return new Promise((resolve, reject) => {
          if(data[1] === 201) {
            resolve(data);
          }
          else {
            reject(data);
          }
        });
      }, ()=>{});
    }
}