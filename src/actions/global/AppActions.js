/**
 * Created by dolphin on 15/7/2017.
 */

export function getAppListAction(request) {
    return {
        type: 'GET_APP_LIST',
        payload: request
    }
}

export function addAppAction(request) {
    return {
        type: 'ADD_APP',
        payload: request
    }
}
