import { get_request } from "./send_request";

export async function logoutRequest() {
    return await (await get_request('logout/')).json();
}