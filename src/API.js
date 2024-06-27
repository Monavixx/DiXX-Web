import { store } from "./index.jsx";
import { get_request_json, post_request_json, put_request_json } from "./functions/send_request";
import { loginAction, logoutAction, pending } from "./slices/userReducer.js";

export const API = {
    checkForLogin: async ()=> {
        store.dispatch(pending(true));
        const [data, status] = await get_request_json('login/');
        if(status === 200) {
            store.dispatch(loginAction({
              name:data.data.username,
              email:data.data.email
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
          if(status === 201) {
            resolve([data, status]);
          }
          else {
            reject([data, status]);
          }
        });
      },
      ()=>{});
    },

    learn: async(setId)=>{
      return await get_request_json(`cards/set/${setId}/random-learn/`);
    },
    /**This function returns a promise. Resolve if success authentication, reject if not. */
    login: async(username, password)=> {

      store.dispatch(pending(true));
      const [data, status] = await post_request_json('login/',{username:username, password:password});
      
      return new Promise((resolve, reject) => {
        if(status === 200) {
          store.dispatch(loginAction({name:data.data.username,
            email:data.data.email
          }));
          resolve([data, status]);
        }
        else {
          store.dispatch(pending(false));
          reject([data, status]);
        }
      });
    },

    logout: async()=>{
      store.dispatch(pending(true));
      const [,status] = await get_request_json('logout/');
      if(status !== 200) {
        console.log('LOGOUT ERROR');
        return;
      }
      store.dispatch(logoutAction());
    },

    __getSet: async(id, fields = []) => {
      return get_request_json(`cards/set/${id}/`, {fields: fields});
    },
    getSet: async(id) => {
      return API.__getSet(id);
    },
    getSetAndItsCards: async(id) => {
      return API.__getSet(id, [
        'id', 'name', 'description', 'card_set',
        'create_datetime','author','is_private','numberOfCards'
      ]);
    },

    signUp: async (username, email, password) => {
      return post_request_json('signup/', {
        username: username,
        email: email,
        password: password
      }).then(([data, status])=>{
        return new Promise((resolve, reject)=>{
          if(status === 201) {
            resolve([data, status]);
          }
          else {
            reject([data, status]);
          }
        });
      });
    },

    removeSet: async(set_id) => {
      return post_request_json('cards/remove-set/', {set_id:set_id})
      .then(([data, status]) => {
        return new Promise((resolve, reject)=> {
          if(status === 200) {
            resolve([data, status]);
          }
          else {
            reject([data, status]);
          }
        });
      });
    },

    editSet: async(set_id, set_name, set_description, set_is_private) => {
      return put_request_json(`cards/edit-set/${set_id}/`, {
        name: set_name,
        description: set_description,
        is_private: set_is_private
      }).then(([data, status]) => {
        return new Promise((resolve, reject) => {
          if(status === 200) {
            resolve([data, status]);
          }
          else {
            reject([data, status]);
          }
        });
      }, ()=>{});
    },

    addCard: async(set_id, first, second) => {
      return post_request_json(`cards/set/${set_id}/add-card/`, {
        first: first,
        second: second
      }).then(([data, status]) => {
        return new Promise((resolve, reject) => {
          if(status === 201) {
            resolve([data, status]);
          }
          else {
            reject([data, status]);
          }
        });
      }, ()=>{});
    },

    getYourSets: async() => {
      const [data, status] = await get_request_json('cards/sets/my/');
      return new Promise((resolve, reject) => {
        if(status === 200)
          resolve([data, status]);
        else
          reject([data, status]);
      })
    },

    deleteCard: async(cardId) => {
      const [data, status] = await post_request_json('cards/delete/', {id: cardId});
      return new Promise((resolve, reject) => {
        if (status === 200) {
          resolve([data, status]);
        }
        else {
          reject([data, status]);
        }
      });
    },

    addSet: async(setId) => {
      const [data, status] = await post_request_json('cards/add-set/', {id:setId});
      return new Promise((resolve, reject) => {
        if (status === 200) {
          resolve([data, status]);
        }
        else {
          reject([data, status]);
        }
      });
    }
}