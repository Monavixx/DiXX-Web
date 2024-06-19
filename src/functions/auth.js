import { get_request } from "../functions/send_request";

export async function logoutRequest() {
    return await (await get_request('http://localhost:3001/logout/')).json();
}