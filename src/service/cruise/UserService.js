import { login, getUserListAction, changeUserPasswordAction } from '../../actions/UserActions'
import { requestWithAction, requestWithoutAction } from '../../api/XHRClient'
import { API } from '@/api/config'

export function loginImpl(request) {
    const config = {
        method: 'post',
        url: `${API}/manage/admin/user/login`,
        data: request
    }
    return requestWithAction(config, login)
}

export function getUserList(request) {
    const config = {
        method: 'post',
        url: `${API}/manage/client/user/page`,
        data: request
    }
    return requestWithAction(config, getUserListAction)
}

export function modifyPassword(request) {
    const config = {
        method: 'post',
        url: `${API}/manage/admin/user/change/pwd`,
        data: request
    }
    return requestWithAction(config, changeUserPasswordAction)
}

export function removeLoginedUserCache(request) {
    //store.dispatch(action(removeUserAction))
}
