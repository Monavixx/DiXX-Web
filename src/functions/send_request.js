import Cookies from 'js-cookie';
import { API_URL } from '../settings';
import { logoutAction } from '../slices/userReducer';
import { store } from '..';
import { navigateAction } from '../slices/locationReduces';

export async function post_request(url, json_obj=null, extra_headers={}) {
    url = API_URL + '/' + url;
    extra_headers['content-type'] = 'application/json';
    extra_headers['Accept'] = 'application/json';
    extra_headers['X-CSRFToken'] = Cookies.get('csrftoken');
    extra_headers['Access-Control-Allow-Origin'] = '*';
    let data = {
        headers:extra_headers,
        method:'post',
        credentials:'include',
        mode: 'cors'
    };
    if(json_obj !== null) {
        data.body = JSON.stringify(json_obj)
    }
    try {
        return await fetch(url, data);
    }
    catch {
        return null;
    }
}

export async function get_request(url, json_obj=null, extra_headers={}) {
    url = API_URL + '/' + url;
    extra_headers['Accept'] = 'application/json';
    extra_headers['Access-Control-Allow-Origin'] = '*';
    let data = {
        headers:extra_headers,
        method:'get',
        credentials:'include',
        mode: 'cors'
    };
    if(json_obj !== null) {
        url += '?' + new URLSearchParams(json_obj).toString();
        
    }
    try {
        return await fetch(url, data);
    }
    catch (e) {
        console.log(e);
        return null;
    }
}

function handleStatusCode(status, ignoreCodes=[]) {
    if(ignoreCodes.findIndex((v)=>v===status) !== -1) return;
    if(status === 401 || status === 403) {
        store.dispatch(logoutAction());
        //window.reloadPage();
    }
    if (status === 404) {
        store.dispatch(navigateAction('/404'));
    }
}

async function handleResponse(response, ignoreCodes=[]) {
    const data = await response.json();
    if(data?.message) console.log(`Message from server: ${data.message}`);
    if(data?.messages) {
        data.messages.forEach(v=>{
            console.log(`Message from the server: ${v}`);
        });
    }
    handleStatusCode(response.status, ignoreCodes);
    return [data, response.status];
}


export async function get_request_json(url, json_obj=null, ignoreCodes=[], extra_headers={}) {
    const response = await get_request(url, json_obj, extra_headers);
    return await handleResponse(response, ignoreCodes);
}
export async function post_request_json(url, json_obj=null, ignoreCodes=[], extra_headers={}) {
    const response = await post_request(url, json_obj, extra_headers);
    return await handleResponse(response, ignoreCodes);
}

