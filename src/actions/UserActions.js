/**
 * Created by dolphin on 15/7/2017.
 */
export function login(request) {
    return {
        type: "LOGIN",
        payload: request
    };
}

export function getUserListAction(request) {
    return {
        type: "GET_USER_LIST",
        payload: request
    };
}
