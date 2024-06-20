import Cookies from 'js-cookie';
import { API_URL } from '../settings';

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
    return await fetch(url, data);
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
    return await fetch(url, data);
}