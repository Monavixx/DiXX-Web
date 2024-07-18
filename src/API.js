import { store } from "./store.ts";
import { get_request_json, post_request_json, put_request_json } from "./functions/send_request.ts";
import { UserActions } from "./slices/userSlice.ts";

export const API = {
    checkForLogin: async ()=> { //////////////////// +
        store.dispatch(UserActions.pending(true));
        if(localStorage.getItem('token') === null) {
          store.dispatch(UserActions.logoutAction());
          return;
        }
        const [data, status] = await get_request_json('login/');
        if(status === 200) {
            store.dispatch(UserActions.loginAction({
              name:data.data.username,
              email:data.data.email
            }));
        }
        else {
          store.dispatch(UserActions.logoutAction());
        }
    },
    createNewSet: async({name, description, visibility}) => {
      return post_request_json('cards/create-new-set/', {
        name: name,
        description: description,
        visibility: visibility
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
    login: async(username, password)=> { /////////////// +

      store.dispatch(UserActions.pending(true));
      const [data, status] = await post_request_json('login/',{username:username, password:password});
      
      return new Promise((resolve, reject) => {
        if(status === 200) {
          store.dispatch(UserActions.loginAction({
            name:data.data.username,
            email:data.data.email
          }));
          localStorage.setItem('token', data.data.token);
          resolve([data, status]);
        }
        else {
          store.dispatch(UserActions.pending(false));
          reject([data, status]);
        }
      });
    },

    regenerateToken: async()=>{ ////////////////// +
      store.dispatch(UserActions.pending(true));
      const [data,status] = await get_request_json('regenerate-token/');
      if(status === 200) {
        localStorage.setItem('token', data.data.token);
      }
      store.dispatch(UserActions.pending(false));
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
        'create_datetime','author','visibility','numberOfCards', 'visibility_choices'
      ]);
    },
    getDataForCreatingSet: async() => {
      return get_request_json('cards/data-for-creating-set/');
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

    editSet: async(set_id, set_name, set_description, set_visibility) => {
      return put_request_json(`cards/edit-set/${set_id}/`, {
        name: set_name,
        description: set_description,
        visibility: set_visibility
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
      const [data, status] = await get_request_json('cards/sets/my/', store.dispatch);
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
    },


    sendFriendRequest: async(username) => {
      return post_request_json('friends/request/', {'receiver_username': username});
    },

    acceptFriendRequest: async(request_id) => {
      return post_request_json('friends/accept/', {'request_id': request_id});
    },

    getFriends: async() => {
      return get_request_json('friends/list/');
    },

    getFriendRequests: async() => {
      return get_request_json('friends/requests/');
    },

    findPeople: async(username) => {
      return get_request_json('friends/find-people/', {'username': username});
    },

    unfriend: async(username) => {
      return post_request_json('friends/unfriend/', {'username': username});
    }
}