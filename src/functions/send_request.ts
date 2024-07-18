import Cookies from 'js-cookie';
import { API_URL } from '../settings.ts';
import { UserActions } from '../slices/userSlice.ts';
import { Dispatch } from 'redux';


type Method = "get" | "post" | "put";

async function any_request(method: Method, url:string, json_obj:any=null,extra_headers:any={}) {
    url = API_URL + '/' + url;
    extra_headers['Accept'] = 'application/json';
    extra_headers['Access-Control-Allow-Origin'] = '*';
    extra_headers['content-type'] = 'application/json';

    addAuthorizationHeaderIfAny(extra_headers);

    let data = {
        headers:extra_headers,
        method:method,
        credentials:'include',
        mode: 'cors',
        body:null
    } as {body:any};
    if(json_obj !== null) {
        data.body = JSON.stringify(json_obj)
    }
    try {
        return await fetch(url, data);
    }
    catch (e) {
        console.log(e);
        return null;
    }
}

export async function post_request(url:string, json_obj:any=null, extra_headers:any={}) {
    
    extra_headers['X-CSRFToken'] = Cookies.get('csrftoken');
    return any_request('post', url, json_obj, extra_headers);
}

export async function put_request(url:string, json_obj:any=null, extra_headers:any={}) {
    
    extra_headers['X-CSRFToken'] = Cookies.get('csrftoken');
    return any_request('put', url, json_obj, extra_headers);
}

export async function get_request(url:string, json_obj:any=null, extra_headers:any={}) {
    
    if(json_obj !== null) {
        url += '?' + new URLSearchParams(json_obj).toString();   
    }
    return any_request('get', url, null, extra_headers);
}

function addAuthorizationHeaderIfAny(headers) {
    const token = localStorage.getItem('token');
    if(token !== null)
        headers['Authorization'] = `Token ${token}`;
}

async function handleResponse(response, dispatch?:Dispatch) : Promise<[any, number]> {
    const data = await response.json();
    if(data?.message) console.log(`Message from server: ${data.message}`);
    if(data?.messages) {
        data.messages.forEach(v=>{
            console.log(`Message from the server: ${v}`);
        });
    }
    console.log(data);

    if(response.status === 401 && dispatch !== undefined && dispatch !== null)
        dispatch(UserActions.logoutAction());

    return [data, response.status];
}


export async function get_request_json(url:string, dispatch?:Dispatch, json_obj:any=null, extra_headers:any={}) {
    const response = await get_request(url, json_obj, extra_headers);
    return handleResponse(response, dispatch);
}
export async function post_request_json(url:string, dispatch?:Dispatch, json_obj:any=null, extra_headers:any={}) {
    const response = await post_request(url, json_obj, extra_headers);
    return handleResponse(response, dispatch);
}
export async function put_request_json(url:string, dispatch?:Dispatch, json_obj:any=null, extra_headers:any={}) {
    const response = await put_request(url, json_obj, extra_headers);
    return handleResponse(response, dispatch);
}

