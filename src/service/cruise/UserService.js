
import { login, getUserListAction, removeUserAction } from '../../actions/UserActions'
import { requestWithAction } from '../../api/XHRClient'
import { API } from '@/api/config'

export function loginImpl(request) {
    const config = {
        method: 'post',
        url: `${API}/manage/user/login`,
        data: request
    };
    return requestWithAction(config, login);
}

export function getUserList(request) {
    const config = {
        method: 'post',
        url: `${API}/manage/client/user/page`,
        data: request
    };
    return requestWithAction(config, getUserListAction);
}

export function removeLoginedUserCache(request) {
    //store.dispatch(action(removeUserAction))
}
