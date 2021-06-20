/**
 * Created by dolphin on 15/7/2017.
 */
export function login(request) {
    return {
        type: 'LOGIN',
        payload: request
    }
}

export function getUserListAction(request) {
    return {
        type: 'GET_USER_LIST',
        payload: request
    }
}

export function removeUserAction(request) {
    return {
        type: 'REMOVE_USER',
        payload: request
    }
}

export function changeUserPasswordAction(request) {
    return {
        type: 'CHANGE_USER_PASSWORD',
        payload: request
    }
}
