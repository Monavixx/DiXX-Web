import { get_request } from "../send_request";
import { logoutAction } from "../slices/userReducer";

export async function logoutRequest(dispatch) {
    dispatch(logoutAction());
    return await (await get_request('http://localhost:3001/logout/')).json();
}