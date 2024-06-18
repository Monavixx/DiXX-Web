import Cookies from 'js-cookie';

export async function post_request(url, json_obj=null, extra_headers={}) {
    extra_headers['content-type'] = 'application/json';
    extra_headers['Accept'] = 'application/json';
    extra_headers['X-CSRFToken'] = Cookies.get('csrftoken');
    extra_headers['Access-Control-Allow-Origin'] = '*';
    let data = {
        headers:extra_headers,
        method:'post',
        credentials:'include'
    };
    if(json_obj !== null) {
        data.body = JSON.stringify(json_obj)
    }
    return await fetch(url, data);
}

export async function get_request(url, json_obj=null, extra_headers={}) {
    extra_headers['Accept'] = 'application/json';
    let data = {
        headers:extra_headers,
        method:'get',
        credentials:'include'
    };
    if(json_obj !== null) {
        data.body = JSON.stringify(json_obj);
    }
    return await fetch(url, data);
}