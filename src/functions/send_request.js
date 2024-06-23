import Cookies from 'js-cookie';
import { API_URL } from '../settings';
import { logoutAction } from '../slices/userReducer';
import { store } from '..';

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
        data.body = JSON.stringify(json_obj);
    }
    try {
        return await fetch(url, data);
    }
    catch {
        return null;
    }
}

function handleStatusCode(status) {
    if(status === 401 || status === 403) {
        store.dispatch(logoutAction());
        //window.reloadPage();
    }
}

export async function get_request_json(url, json_obj=null, extra_headers={}) {
    let data = await get_request(url, json_obj, extra_headers);

    handleStatusCode(data.status);

    return [await data.json(), data.status];
}
export async function post_request_json(url, json_obj=null, extra_headers={}) {
    let data = await post_request(url, json_obj, extra_headers);

    handleStatusCode(data.status);

    return [await data.json(), data.status];
}

